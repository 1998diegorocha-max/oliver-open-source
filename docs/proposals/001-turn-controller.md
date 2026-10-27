# Proposal 001: an inspectable conversation-turn controller

Status: implemented as a public source component, version 0.1.0.

## Problem and selection

A conversation host needs to distinguish an interim transcript from a final one, wait for its chosen silence window and discard events from cancelled or replaced turns. Those decisions can be tested without choosing a model or publishing a private application.

This is the first selected public component because it isolates a useful interaction boundary, has no runtime dependencies and allows meaningful failure tests with a controlled clock.

## Bounded implementation

- One current transcript with a configurable length bound.
- Synchronous events, explicit turn IDs and a monotonic clock supplied by an adapter.
- Immutable decisions containing submit or cancel intents.
- Automatic or explicit-review policy; a deadline never silently sends an unfinished draft.
- Runnable CLI and loopback-only browser simulations.

This source was newly authored for the public repository. Private application code, history, recordings, logs, credentials and device configuration were not imported. No third-party code or model weights are bundled.

## Acceptance and evidence

Public tests exercise normal flow and failure boundaries: partial/revised recognition, duplicate and stale events, cancellation before and after submission, pause/resume, deadline review, malformed/oversized input and host-server boundaries. [Evidence](../TECHNICAL_EVIDENCE.md) records actual runs and source hashes.

The module produces decisions only. Recognition, synthesis, transport, remote cancellation, device authentication and real human conversation remain integration work. See the [threat model](../THREAT_MODEL.md).
