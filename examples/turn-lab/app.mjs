import { createTurnController } from './turn-controller.mjs';

const $ = id => document.getElementById(id);
let controller;
let now = 0;
let sequence = 0;
let submits = 0;
let cancels = 0;

function reset() {
  controller = createTurnController({ mode: $('mode').value });
  now = 0; sequence = 0; submits = 0; cancels = 0;
  $('events').replaceChildren();
  render('Ready. Start a turn or run a scenario.');
}
function render(reason) {
  const state = controller.getState();
  $('clock').textContent = `${now} ms`;
  $('submits').textContent = String(submits);
  $('cancels').textContent = String(cancels);
  $('phase').textContent = state.phase;
  $('reason').textContent = reason;
  $('snapshot').textContent = JSON.stringify(state, null, 2);
  for (const button of document.querySelectorAll('[data-event]')) {
    const event = button.dataset.event;
    button.disabled = event === 'resume' ? state.phase !== 'paused'
      : event === 'start' ? state.phase === 'paused'
      : ['partial', 'final', 'tick'].includes(event) ? state.phase !== 'listening'
      : event === 'confirm' ? !state.text || !(['review', 'listening'].includes(state.phase)) || (state.phase === 'listening' && !state.final)
      : event === 'cancel' ? !['listening', 'review', 'submitted'].includes(state.phase)
      : state.phase === 'paused';
  }
}
function send(type, at, extra = {}) {
  now = at;
  const result = controller.dispatch({ type, at, turn: controller.getState().turn, ...extra });
  for (const intent of result.intents) {
    if (intent.type === 'submit') submits++;
    if (intent.type === 'cancel') cancels++;
  }
  const item = document.createElement('li');
  item.textContent = `${at} ms · ${type} · ${result.reason}${result.intents.length ? ` · ${result.intents.map(intent => intent.type).join(', ')} intent` : ''}`;
  $('events').prepend(item);
  while ($('events').children.length > 24) $('events').lastElementChild.remove();
  render(result.reason);
  return result;
}
for (const button of document.querySelectorAll('[data-event]')) {
  button.addEventListener('click', () => {
    const type = button.dataset.event;
    if (type === 'start') sequence = 0;
    if (['partial', 'final'].includes(type)) {
      send('transcript', now + 100, { sequence: ++sequence, text: $('transcript').value, final: type === 'final' });
    } else send(type, now + (type === 'tick' ? 500 : 1));
  });
}
$('mode').addEventListener('change', reset);
$('run-scenario').addEventListener('click', () => {
  $('mode').value = 'auto';
  reset();
  send('start', 0);
  const scenario = $('scenario').value;
  const transcript = (at, final = true, extra = {}) => send('transcript', at, {
    sequence: ++sequence, text: $('transcript').value, final, ...extra,
  });
  if (scenario === 'partial') { transcript(100, false); send('tick', 5000); }
  else if (scenario === 'cancel') { transcript(100); send('cancel', 800); send('tick', 1600); }
  else if (scenario === 'stale') { transcript(100); send('start', 200); transcript(300, true, { turn: 1 }); }
  else if (scenario === 'review') { transcript(100, false); send('tick', 12000); send('confirm', 12100); }
  else { transcript(100); send('tick', 1599); send('tick', 1600); }
});
reset();
