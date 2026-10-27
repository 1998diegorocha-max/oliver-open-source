# DRAGON · OLIVER Open Source

**Personal intelligence across your devices. Under your control.**

[Português brasileiro](README.pt-BR.md) · [Project brief](docs/PROJECT_BRIEF.md) · [Public evidence](docs/TECHNICAL_EVIDENCE.md) · [Status](docs/STATUS.md) · [Roadmap](docs/ROADMAP.md) · [Contribute](CONTRIBUTING.md)

DRAGON is a Brazilian initiative building toward a personal intelligence layer: conversation, user-controlled context and useful actions across enrolled devices. **OLIVER is the personal assistant at the center of that vision.** JARVIS is the historical internal development name.

Our distinctive focus combines Brazilian Portuguese, accessible hardware, explicit control over actions and independently reproducible components. We want assistance that can follow a person from phone to computer and eventually other authorized environments, with understandable boundaries at every step.

## Start with something you can inspect

The first public software component is **[OLIVER Turn Controller v0.1.0](packages/turn-controller/README.md)**: a small, dependency-free JavaScript module that decides when a conversation transcript is eligible for submission.

It waits for a final transcript and a configured silence window, rejects stale callbacks, prevents duplicate submit intents, supports cancellation and pause, and falls back to explicit review when recognition takes too long. The host application remains responsible for recognition, request execution and honoring cancellation.

```sh
git clone https://github.com/1998diegorocha-max/oliver-open-source.git
cd oliver-open-source
node --test
node examples/turn-cli.mjs
node examples/turn-lab/server.mjs
```

Use **Node.js 24.x**. No `npm install`, API key, model download or paid account is required. Open **http://127.0.0.1:4173** after the last command to explore the interactive lab. Stop the server with Ctrl+C.

**The lab simulates transcript events and elapsed time.** It does not open a microphone, generate answers, synthesize speech or operate a device. The test server binds to loopback only; the controller itself has no network, storage or timer access.

## Evidence before broader claims

| Available in this checkout | How to inspect it |
| --- | --- |
| Reusable turn-control implementation | [Source](packages/turn-controller/src/turn-controller.mjs) and [API contract](packages/turn-controller/README.md) |
| 35 automated test cases | [Controller tests](test/turn-controller.test.mjs) and [HTTP demo tests](test/demo-server.test.mjs); run `node --test` |
| CLI and browser simulations | [CLI example](examples/turn-cli.mjs) and [interactive lab](examples/turn-lab/) |
| Recorded execution and source hashes | [Technical evidence](docs/TECHNICAL_EVIDENCE.md) and [validation receipt](evidence/turn-controller-v0.1.0/validation.json) |
| A bounded proposal and threat model | [Proposal](docs/proposals/001-turn-controller.md) and [threat boundaries](docs/THREAT_MODEL.md) |
| Cross-device platform, memory and supervised agents | [Design and future architecture](docs/VISION.md); these are roadmap objectives |

The public component is an early engineering building block. The full Android assistant, natural voice quality, model integrations and cross-device runtime are not distributed or validated by this checkout. Related private prototyping is separate. See [the exact public status](docs/STATUS.md).

## Why this project exists

We start with everyday assistance in Brazilian Portuguese and hardware that people already own. The direction is to give users control over conversation timing, what is remembered, which devices participate and what an agent may do.

The longer-term architecture separates model suggestions from tool authorization, uses scoped adapters and makes consequential actions reviewable. Cryptography, identity, revocation and isolation need their own implementation and evaluation. See the [vision](docs/VISION.md), [roadmap](docs/ROADMAP.md) and [security policy](SECURITY.md).

## Help shape the next component

We welcome reproducible bug reports, Portuguese conversation scenarios, accessibility feedback and focused improvements to the public module. Start with the [contribution guide](CONTRIBUTING.md). The next integration milestone is an explicit speech-recognizer adapter with realistic timing and interruption tests.

Diego Rocha de Oliveira — founder and project lead. Vinícius Messias — technical collaborator.

Public source and documentation use the [MIT License](LICENSE). No third-party models, private product code or external-service entitlement is included. This is an independent project; no provider endorsement or independent security certification is claimed.
