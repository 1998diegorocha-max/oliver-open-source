# Contributing

English and Brazilian Portuguese contributions are welcome. The current public component is [OLIVER Turn Controller](packages/turn-controller/README.md).

## Run and verify

Use Node.js 24.x, then run from this checkout:

```sh
node --test
node examples/turn-cli.mjs
node examples/turn-lab/server.mjs
```

No dependency installation or service account is needed. The browser lab is a local simulation. See [technical evidence](docs/TECHNICAL_EVIDENCE.md) for exact scope and the [API contract](packages/turn-controller/README.md) before changing events.

Useful contributions include reproducible failures, Brazilian Portuguese recognition scenarios, accessible review controls, lifecycle/cancellation adapters and focused code improvements. Discuss substantial changes before preparing a large pull request.

## A useful change

Describe the problem, the smallest useful change and how another contributor can verify it. Include relevant tests, setup, limitations and dependency licenses. Report failures as well as successes. Distinguish a simulation from a real-device test, and do not turn a source-byte measurement into a token-saving or voice-latency claim.

Use a focused branch and the pull-request template. Source changes should update the recorded evidence through an actual test run; do not edit hashes simply to make the checker pass. Keep new test results clearly separated from the original v0.1.0 record.

## Review and publication

Preserve the license and public history. Review public files for credentials, private endpoints, personal information and redistribution rights. Private product code, history, logs, recordings, keys and owner data must not be copied into this repository as part of a contribution. Follow [SECURITY.md](SECURITY.md) for sensitive findings.
