/**
 * DRAGON / OLIVER Turn Controller, MIT licensed.
 * Produces decisions only: no microphone, timers, network, storage, or model calls.
 * Adapters must honor cancellation and supply a local monotonic clock.
 */
export function createTurnController(options = {}) {
  const { silenceMs = 1500, maxWaitMs = 12000, maxChars = 4000, mode = 'auto' } = options;
  if (!Number.isFinite(silenceMs) || silenceMs < 100 || silenceMs > 10000) {
    throw new RangeError('silenceMs must be between 100 and 10000');
  }
  if (!Number.isFinite(maxWaitMs) || maxWaitMs <= silenceMs || maxWaitMs > 60000) {
    throw new RangeError('maxWaitMs must exceed silenceMs and be at most 60000');
  }
  if (!Number.isSafeInteger(maxChars) || maxChars < 1 || maxChars > 65536) {
    throw new RangeError('maxChars must be an integer between 1 and 65536');
  }
  if (!['auto', 'review'].includes(mode)) throw new TypeError('mode must be auto or review');

  let state = Object.freeze({
    phase: 'idle', turn: 0, text: '', final: false, sequence: -1,
    startedAt: null, lastSpeechAt: null, observedAt: 0,
  });
  const active = () => ['listening', 'review', 'submitted'].includes(state.phase);
  const change = patch => { state = Object.freeze({ ...state, ...patch }); };
  const result = (accepted, reason, intents = []) => Object.freeze({
    accepted, reason, state,
    intents: Object.freeze(intents.map(intent => Object.freeze(intent))),
  });
  const submit = source => {
    change({ phase: 'submitted' });
    return result(true, 'submitted', [{ type: 'submit', turn: state.turn, text: state.text, source }]);
  };
  const cancellation = reason => state.phase === 'submitted'
    ? [{ type: 'cancel', turn: state.turn, reason }] : [];

  function dispatch(event) {
    const types = ['start', 'transcript', 'tick', 'confirm', 'cancel', 'pause', 'resume'];
    if (!event || !types.includes(event.type)) throw new TypeError('Unknown turn event');
    if (!Number.isFinite(event.at) || event.at < 0) throw new TypeError('event.at must be a nonnegative finite number');
    const global = ['start', 'pause', 'resume'].includes(event.type);
    if (!global && event.turn !== state.turn) return result(false, 'stale_turn');
    if (event.at < state.observedAt) return result(false, 'clock_moved_backwards');

    if (event.type === 'pause') {
      if (state.phase === 'paused') return result(false, 'already_paused');
      const intents = cancellation('paused');
      change({ phase: 'paused', final: false, observedAt: event.at });
      return result(true, 'paused', intents);
    }
    if (event.type === 'resume') {
      if (state.phase !== 'paused') return result(false, 'not_paused');
      change({ phase: 'idle', text: '', final: false, sequence: -1,
        startedAt: null, lastSpeechAt: null, observedAt: event.at });
      return result(true, 'resumed');
    }
    if (event.type === 'start') {
      if (state.phase === 'paused') return result(false, 'paused');
      const intents = cancellation('replaced');
      change({ phase: 'listening', turn: state.turn + 1, text: '', final: false,
        sequence: -1, startedAt: event.at, lastSpeechAt: null, observedAt: event.at });
      return result(true, 'started', intents);
    }
    if (!active()) return result(false, 'inactive_turn');
    if (event.type === 'cancel') {
      const intents = cancellation('cancelled');
      change({ phase: 'cancelled', final: false, observedAt: event.at });
      return result(true, 'cancelled', intents);
    }
    if (event.type === 'confirm') {
      if (state.phase === 'submitted') return result(false, 'already_submitted');
      if (!state.text) return result(false, 'empty_transcript');
      if (state.phase !== 'review' && !state.final) return result(false, 'no_final_transcript');
      change({ observedAt: event.at });
      return submit('review');
    }
    if (state.phase !== 'listening') return result(false, 'not_listening');

    // An overdue recognition event never silently re-arms automatic submission.
    if (event.at - state.startedAt >= maxWaitMs) {
      change({ phase: 'review', final: false, observedAt: event.at });
      return result(true, 'deadline_requires_review');
    }
    if (event.type === 'transcript') {
      if (!Number.isSafeInteger(event.sequence) || event.sequence < 0 ||
          typeof event.text !== 'string' || typeof event.final !== 'boolean') {
        change({ phase: 'review', final: false, observedAt: event.at });
        return result(false, 'invalid_transcript');
      }
      if (event.sequence <= state.sequence) return result(false, 'stale_sequence');
      const text = event.text.trim();
      if (text.length > maxChars) {
        change({ phase: 'review', final: false, observedAt: event.at });
        return result(false, 'transcript_too_long');
      }
      change({ text, final: event.final && text.length > 0, sequence: event.sequence,
        lastSpeechAt: event.at, observedAt: event.at,
        phase: mode === 'review' && event.final && text ? 'review' : 'listening' });
      return result(true, 'transcript_accepted');
    }
    change({ observedAt: event.at });
    if (!state.final || !state.text) return result(true, 'waiting_for_final');
    if (event.at - state.lastSpeechAt < silenceMs) return result(true, 'waiting_for_silence');
    return submit('silence');
  }
  return Object.freeze({ dispatch, getState: () => state });
}
