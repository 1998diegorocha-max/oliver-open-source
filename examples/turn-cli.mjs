import { createTurnController } from '../packages/turn-controller/src/turn-controller.mjs';

const controller = createTurnController();
const events = [
  { type: 'start', at: 0 },
  { type: 'transcript', at: 100, turn: 1, sequence: 1, text: 'Olá, OLIVER. Vamos organizar meu projeto?', final: false },
  { type: 'tick', at: 2000, turn: 1 },
  { type: 'transcript', at: 2100, turn: 1, sequence: 2, text: 'Olá, OLIVER. Vamos organizar meu projeto?', final: true },
  { type: 'tick', at: 3600, turn: 1 },
  { type: 'cancel', at: 3700, turn: 1 },
];
console.log('Local simulation. Intents below are data; no request is executed.');
for (const event of events) {
  const result = controller.dispatch(event);
  console.log(JSON.stringify({ at: event.at, event: event.type, phase: result.state.phase, reason: result.reason, intents: result.intents }));
}
