# OLIVER Turn Controller · v0.1.0

A dependency-free, synchronous decision component for voice or text assistant hosts. It emits immutable **intents**; it does not execute requests.

## Minimal use

```js
import { createTurnController } from './src/turn-controller.mjs';

const turns = createTurnController({ silenceMs: 1500, maxWaitMs: 12000 });
const started = turns.dispatch({ type: 'start', at: 0 });
const turn = started.state.turn; // Capture this identifier in the recognizer callback.

turns.dispatch({ type: 'transcript', at: 100, turn, sequence: 1,
  text: 'Olá, OLIVER. Vamos organizar meu projeto?', final: true });

const decision = turns.dispatch({ type: 'tick', at: 1600, turn });
console.log(decision.intents);
// [{ type: 'submit', turn: 1, text: 'Olá, OLIVER. Vamos organizar meu projeto?', source: 'silence' }]
```

Run the [complete example](../../examples/turn-cli.mjs) with `node examples/turn-cli.mjs` from the repository root. Source is distributed in this repository; no npm registry publication is claimed. Both package manifests are private to prevent accidental registry publication.

## Configuration

| Option | Default | Contract |
| --- | --- | --- |
| `silenceMs` | `1500` | Finite milliseconds, 100–10000 |
| `maxWaitMs` | `12000` | Finite milliseconds, greater than `silenceMs`, at most 60000 |
| `maxChars` | `4000` | Integer 1–65536; counts UTF-16 code units after trimming |
| `mode` | `auto` | `auto` or `review` |

These defaults illustrate a policy. They are not measured optimal speech settings. The validated environment is Node.js 24.x. The controller uses standard JavaScript without Node-specific imports; real browser and Android recognizer adapters still need integration validation.

## Event contract

Every event includes `type` and `at`. Supply `at` from a **local monotonic clock**, in milliseconds, using a single time origin. `Date.now()` can move backwards and is unsuitable for this contract.

| Event | Additional fields | Effect |
| --- | --- | --- |
| `start` | None | Creates a new turn; replaces and cancels a submitted previous turn |
| `transcript` | `turn`, increasing integer `sequence`, string `text`, boolean `final` | Accepts the latest recognition snapshot while listening |
| `tick` | `turn` | Checks silence and maximum wait; does not create a timer |
| `confirm` | `turn` | Explicitly submits review text, or a final listening transcript |
| `cancel` | `turn` | Ends the turn; emits cancellation if it was already submitted |
| `pause` | None | Globally blocks starts and callbacks; cancels a submitted turn |
| `resume` | None | Leaves pause in idle state and clears the previous draft |

Recognition text is a complete snapshot, not an append-only delta. Sequence numbers start at zero or higher and increase within the same turn. **Keep the originating turn identifier in callbacks**; relabeling a late callback with the current turn defeats stale-event protection. Turn numbers are local identifiers, not credentials or globally unique request IDs.

The result is `{ accepted, reason, state, intents }`. State and intents are frozen. `accepted` describes event acceptance, not model-request success. Reasons such as `stale_turn`, `stale_sequence`, `clock_moved_backwards` and `not_listening` explain ignored events.

Malformed or oversized recognition payloads move a listening turn to review, remove automatic eligibility and preserve only the previous bounded draft. Reaching the maximum wait also requires review; a late transcript is not substituted for the draft. Empty text cannot be submitted. Invalid configuration, clocks or unknown event types throw without changing state; adapters should pause and report input-contract errors.

## Host responsibilities

- Call `tick` while listening. Decisions do not run on their own.
- Supply correct finality and sequencing. A recognizer's premature final result can still cause premature submission after the configured silence period.
- Execute each submit intent once and map its local turn to an appropriately scoped request ID.
- Honor cancel intents, abort pending work and discard late results or audio. This module cannot revoke an external service call.
- Send `pause` on lifecycle or permission loss and require an explicit new start after resume.
- Enforce authentication, consent, tool permissions, storage policy and model billing separately.

## Reproduce

From the repository root:

```sh
node --test test/turn-controller.test.mjs
node examples/turn-lab/server.mjs
```

The controller keeps one bounded transcript and no history. It performs no network, filesystem, microphone, model or timer operations. The browser lab stores no persistent data and limits its visible trail to 24 events. These design facts are not an independent security audit or a complete resource benchmark.

See [test evidence](../../docs/TECHNICAL_EVIDENCE.md), [threat boundaries](../../docs/THREAT_MODEL.md) and the [MIT License](../../LICENSE).
