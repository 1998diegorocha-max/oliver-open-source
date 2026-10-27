import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createTurnController } from '../packages/turn-controller/src/turn-controller.mjs';

function session(options = {}) {
  const controller = createTurnController(options);
  controller.dispatch({ type: 'start', at: 0 });
  const emit = (type, at, data = {}) => controller.dispatch({ type, at, turn: controller.getState().turn, ...data });
  const final = (at = 100, text = 'Olá, OLIVER', sequence = 1) => emit('transcript', at, { sequence, text, final: true });
  return { controller, emit, final };
}

test('a final transcript waits for the complete silence window', () => {
  const { emit, final } = session();
  final();
  assert.equal(emit('tick', 1599).intents.length, 0);
  const result = emit('tick', 1600);
  assert.deepEqual(result.intents, [{ type: 'submit', turn: 1, text: 'Olá, OLIVER', source: 'silence' }]);
});
test('partial recognition cannot auto-submit or be confirmed before review', () => {
  const { emit } = session();
  emit('transcript', 100, { sequence: 1, text: 'ainda estou falando', final: false });
  assert.equal(emit('tick', 5000).reason, 'waiting_for_final');
  assert.equal(emit('confirm', 5001).reason, 'no_final_transcript');
});
test('continued speech invalidates an older final transcript', () => {
  const { emit, final } = session();
  final();
  emit('transcript', 1500, { sequence: 2, text: 'Olá, OLIVER, pesquise', final: false });
  assert.equal(emit('tick', 5000).intents.length, 0);
  final(5100, 'Olá, OLIVER, pesquise energia solar', 3);
  assert.equal(emit('tick', 6600).intents[0].text, 'Olá, OLIVER, pesquise energia solar');
});
test('revised final text restarts the silence window', () => {
  const { emit, final } = session(); final(); final(1000, 'versão corrigida', 2);
  assert.equal(emit('tick', 1600).intents.length, 0);
  assert.equal(emit('tick', 2500).intents[0].text, 'versão corrigida');
});
test('repeated ticks and confirmations cannot duplicate a submission', () => {
  const { emit, final } = session(); final(); emit('tick', 1600);
  assert.equal(emit('tick', 1700).intents.length, 0);
  assert.equal(emit('confirm', 1800).intents.length, 0);
});
test('cancellation before the deadline prevents later automatic submission', () => {
  const { emit, final } = session(); final(); emit('cancel', 1599);
  assert.equal(emit('tick', 1600).intents.length, 0);
});
test('cancellation after submission emits one cancellation intent', () => {
  const { emit, final } = session(); final(); emit('tick', 1600);
  assert.deepEqual(emit('cancel', 1700).intents, [{ type: 'cancel', turn: 1, reason: 'cancelled' }]);
  assert.equal(emit('cancel', 1800).intents.length, 0);
});
test('a replaced turn rejects callbacks bearing the old turn identifier', () => {
  const { controller, emit, final } = session(); final(); emit('start', 200);
  const result = emit('transcript', 300, { turn: 1, sequence: 99, text: 'antigo', final: true });
  assert.equal(result.reason, 'stale_turn');
  assert.equal(controller.getState().text, '');
});
test('replacing a submitted turn cancels the previous intent', () => {
  const { emit, final } = session(); final(); emit('tick', 1600);
  assert.deepEqual(emit('start', 1700).intents, [{ type: 'cancel', turn: 1, reason: 'replaced' }]);
});
test('pause blocks new starts and callbacks until explicit resume', () => {
  const { emit, final } = session(); final(); emit('pause', 200);
  assert.equal(emit('start', 300).reason, 'paused');
  assert.equal(emit('tick', 2000).intents.length, 0);
  assert.equal(emit('transcript', 2100, { sequence: 2, text: 'tardio', final: true }).intents.length, 0);
});
test('pause after submission asks the adapter to stop the active request', () => {
  const { emit, final } = session(); final(); emit('tick', 1600);
  assert.deepEqual(emit('pause', 1700).intents, [{ type: 'cancel', turn: 1, reason: 'paused' }]);
  assert.equal(emit('pause', 1800).intents.length, 0);
});
test('resume discards automatic eligibility and never replays an old draft', () => {
  const { controller, emit, final } = session(); final(); emit('pause', 200); emit('resume', 300);
  assert.equal(controller.getState().phase, 'idle');
  assert.equal(controller.getState().text, '');
  assert.equal(emit('tick', 3000).intents.length, 0);
  emit('start', 3100); final(3200, 'novo turno');
  assert.equal(emit('tick', 4700).intents[0].text, 'novo turno');
});
test('an incomplete transcript falls back to explicit review at the deadline', () => {
  const { emit } = session();
  emit('transcript', 100, { sequence: 1, text: 'rascunho incompleto', final: false });
  const expired = emit('tick', 12000);
  assert.equal(expired.state.phase, 'review'); assert.equal(expired.intents.length, 0);
  assert.equal(emit('confirm', 12100).intents[0].source, 'review');
});
test('an overdue tick requires review even for an earlier final transcript', () => {
  const { emit, final } = session(); final();
  assert.equal(emit('tick', 12000).reason, 'deadline_requires_review');
  assert.equal(emit('tick', 13000).intents.length, 0);
});
test('an overdue recognition callback cannot re-arm automatic sending', () => {
  const { emit } = session();
  assert.equal(emit('transcript', 12000, { sequence: 1, text: 'atrasado', final: true }).state.phase, 'review');
  assert.equal(emit('confirm', 12001).reason, 'empty_transcript');
});
test('review-only mode requires an explicit confirmation', () => {
  const { emit, final } = session({ mode: 'review' }); final();
  assert.equal(emit('tick', 5000).intents.length, 0);
  assert.equal(emit('confirm', 5001).intents[0].source, 'review');
});
test('empty final results never become requests', () => {
  const { emit, final } = session(); final(100, ' \n\t ');
  assert.equal(emit('tick', 5000).intents.length, 0);
  assert.equal(emit('confirm', 5001).reason, 'empty_transcript');
});
test('duplicate and out-of-order sequence numbers cannot overwrite accepted text', () => {
  const { controller, emit, final } = session(); final(100, 'correto', 10);
  assert.equal(emit('transcript', 200, { sequence: 10, text: 'duplicado', final: true }).reason, 'stale_sequence');
  assert.equal(emit('transcript', 300, { sequence: 9, text: 'antigo', final: true }).reason, 'stale_sequence');
  assert.equal(controller.getState().text, 'correto');
});
test('a backward clock does not shorten the silence window or mutate text', () => {
  const { controller, emit, final } = session(); final(1000, 'original');
  assert.equal(emit('transcript', 999, { sequence: 2, text: 'antigo', final: true }).reason, 'clock_moved_backwards');
  assert.equal(controller.getState().text, 'original');
  assert.equal(emit('tick', 2499).intents.length, 0);
});
test('a stale turn with a far-future timestamp cannot expire the current turn', () => {
  const { emit, final } = session(); emit('start', 100); final(200);
  assert.equal(emit('tick', 999999, { turn: 1 }).reason, 'stale_turn');
  assert.equal(emit('tick', 1700).intents.length, 1);
});
test('an oversized update fails closed and preserves a bounded review draft', () => {
  const { emit, final } = session({ maxChars: 10 }); final(100, 'rascunho');
  const bad = final(200, 'x'.repeat(11), 2);
  assert.equal(bad.reason, 'transcript_too_long'); assert.equal(bad.state.text, 'rascunho');
  assert.equal(emit('tick', 2000).intents.length, 0);
});
test('malformed recognition requires review instead of retaining automatic eligibility', () => {
  const { emit, final } = session(); final();
  assert.equal(emit('transcript', 200, { sequence: 2, text: null, final: true }).reason, 'invalid_transcript');
  assert.equal(emit('tick', 2000).intents.length, 0);
});
test('submitted text is isolated from late recognition events', () => {
  const { emit, final } = session(); final(); const sent = emit('tick', 1600);
  final(1700, 'outra resposta', 2);
  assert.equal(sent.intents[0].text, 'Olá, OLIVER');
  assert.equal(sent.state.text, 'Olá, OLIVER');
});
test('snapshots and decisions cannot be changed by a consumer', () => {
  const { controller, emit, final } = session(); final(); const sent = emit('tick', 1600);
  assert.throws(() => { controller.getState().phase = 'listening'; }, TypeError);
  assert.throws(() => { sent.intents[0].text = 'alterado'; }, TypeError);
  assert.throws(() => { sent.intents.push({}); }, TypeError);
});
test('Brazilian Portuguese accents and emoji survive without normalization loss', () => {
  const { emit, final } = session(); final(100, '  Olá! Ação, coração e São Paulo 🐉  ');
  assert.equal(emit('tick', 1600).intents[0].text, 'Olá! Ação, coração e São Paulo 🐉');
});
test('invalid configuration is rejected before creating a controller', () => {
  for (const options of [{ silenceMs: 0 }, { silenceMs: Infinity }, { maxWaitMs: 1500 },
    { maxWaitMs: 60001 }, { maxChars: 0 }, { maxChars: 1.5 }, { mode: 'always-send' }]) {
    assert.throws(() => createTurnController(options));
  }
});
test('invalid clocks and unknown events leave the prior state untouched', () => {
  const { controller, emit } = session(); const before = controller.getState();
  for (const at of [-1, NaN, Infinity, '100']) assert.throws(() => emit('tick', at), TypeError);
  assert.throws(() => controller.dispatch({ type: 'execute-shell', at: 1 }), TypeError);
  assert.equal(controller.getState(), before);
});
test('independent controllers do not share conversation state', () => {
  const a = session(); const b = session(); a.final(100, 'primeiro');
  assert.equal(b.emit('tick', 1600).intents.length, 0);
  assert.equal(a.emit('tick', 1600).intents[0].text, 'primeiro');
});
