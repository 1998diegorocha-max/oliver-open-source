# Reproduce the public evidence

Component: **OLIVER Turn Controller v0.1.0**, 27 October 2026.

## Clean-checkout instructions

Use Node.js 24.x. No package installation, private file, model, API key or paid subscription is required.

```sh
node --test
node examples/turn-cli.mjs
node tools/check-evidence.mjs
node examples/turn-lab/server.mjs
```

The last command starts a loopback server at **http://127.0.0.1:4173**. Open that address in a browser and stop it with Ctrl+C. On Windows the same Node commands work from PowerShell or Command Prompt. Core tests do not require a browser.

## What the tests establish

| Group | Distinct cases | Scope |
| --- | --- | --- |
| Conversation controller | 28 | Partial/final text, silence, revisions, duplicates, old turns, cancellation, pause/resume, review deadlines, input and clock boundaries |
| Local demonstration server | 7 | Asset delivery, JavaScript MIME type, HTTP policy, fixed file routes, rejected mutation methods and HEAD |
| Total | **35** | Simulated logic plus actual loopback HTTP requests |

Machine-readable [validation receipt](../evidence/turn-controller-v0.1.0/validation.json) includes the tested source SHA-256 values and actual environment results. Raw TAP output is linked in that receipt. Repeating the same cases on a second operating system is reproduction, not additional distinct coverage.

| Recorded environment | Result | Raw output |
| --- | --- | --- |
| Linux x86_64, Node.js v24.22.1 | 35 passed, 0 failed | [Linux TAP](../evidence/turn-controller-v0.1.0/node24-linux.tap) |
| Windows AMD64, Node.js v24.21.0 | Same 35 passed, 0 failed | [Windows TAP](../evidence/turn-controller-v0.1.0/node24-windows.tap) |

`check-evidence.mjs` verifies the recorded source bytes, not the truth of a maintainer assertion. Run the tests yourself. This is maintainer-run evidence, not independent certification or hosted CI.

## Boundaries of this evidence

- Transcript input and elapsed time are simulated. No physical speech, microphone, Bluetooth or Android lifecycle is tested.
- Submit/cancel intents are data. No model request, tool action, remote cancellation or speech synthesis is executed.
- The server tests make local HTTP requests only. They do not prove browser visual layout, a production service's security or external network availability.
- The controller has zero external runtime dependencies. Resource use and optimal speech timing have not been benchmarked.
- No APK, model weights, private source, private logs, credentials or personal recordings are included.

The [threat model](THREAT_MODEL.md) names host responsibilities. The [proposal](proposals/001-turn-controller.md) explains the component selection and public-source scope.
