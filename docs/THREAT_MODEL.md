# Turn Controller v0.1.0: threat boundaries

This model covers the public controller and local demonstration. It does not establish the security of a complete assistant, Android application or private deployment.

| Boundary / failure | Implemented behavior | Host responsibility |
| --- | --- | --- |
| Callback from an old turn | Reject mismatched turn ID | Capture the original ID; do not relabel events |
| Repeated/reordered recognition | Reject old sequence numbers | Supply correct sequencing, finality and monotonic time |
| Partial speech pauses too long | No automatic submit; deadline requires review | Evaluate real speech and provide a usable review UI |
| Cancel/pause follows submission | Emit one cancel intent | Abort work and discard late output; completed external effects cannot be undone here |
| Oversized/malformed recognition | Bound stored text and remove automatic eligibility | Validate input and report errors without exposing private content |
| Consumer modifies a decision | Frozen state and intent objects | Protect its own request bookkeeping and concurrency |
| Path or mutation request to local demo | Four fixed routes; GET/HEAD; launcher binds loopback | Keep the machine trusted; do not expose as a production service |
| Markup or instructions in a transcript | UI uses text content; controller treats text as data | Validate downstream model/tool input; this is not a prompt-injection filter |

## Trust assumptions

The adapter and JavaScript runtime are trusted. Turn IDs are not credentials. There is no device authentication, cryptographic storage, sandbox, access-control engine or tamper-proof audit log in this component. The in-memory trail is an inspection aid, not incident evidence.

The demo does not request microphone permission, persist transcripts, use analytics or contact external services. Its HTTP content policy restricts page connections and execution sources. Extensions, a compromised browser and local malware remain outside this boundary.

## Review and future work

Tests are maintainer-run simulations and local HTTP checks, not an independent audit. Next work includes real recognizer events, lifecycle integration, output cancellation, adversarial adapter sequences and accessible review flows. Authentication, encryption, signed updates, external incident reporting and cross-device agents require separate designs and tests.

Use the [security policy](../SECURITY.md) for concerns and [technical evidence](TECHNICAL_EVIDENCE.md) to reproduce current checks.
