# DRAGON: a personal intelligence layer

DRAGON's ambition is to make assistance available across a person's digital environments while preserving their authority over devices, data and decisions. OLIVER is the proposed conversational interface to that experience.

The practical starting point is Brazilian Portuguese and accessible hardware. The project explores how voice, text, explicit memory and focused automation can help with everyday work. Expansion toward computers, wearables, connected spaces and other platforms is a future direction, conditional on useful integrations and measured constraints.

## Proposed boundaries

| Layer | Intended responsibility | Boundary |
| --- | --- | --- |
| OLIVER interface | Explain requests, results, uncertainty and approvals | A conversation does not grant unrestricted access |
| Model adapters | Propose answers or structured actions | Generated content is treated as untrusted input |
| Policy and orchestration | Check identity, scope, resource limits and required approval | Authorization belongs outside the language model |
| Tool and device adapters | Execute narrow operations on enrolled resources | A tool receives only the access its task needs |
| User-controlled context | Store selected information with retention and deletion choices | Private data is not automatically shared across every agent |
| Operational evidence | Record meaningful outcomes and support recovery | Logs minimize sensitive content and distinguish attempts from success |

These are design responsibilities. This repository does not yet implement the architecture.

## Future security research

Areas to investigate include device authentication, protected local storage, key management, scoped credentials, signed updates, sandboxed tools and integrity-protected event records. Security evaluation should cover misuse, compromised components and unsafe model instructions, as well as ordinary software defects.

The proposed defensive response is to classify a suspicious event, constrain the affected operation, notify the owner and preserve a reviewable record. An anomaly is not automatically proof of an attack. External reporting would follow a human decision, supported by evidence and an appropriate reporting channel.

## Principles for progress

We want published components to be small enough to understand, test and reuse. Compatibility, privacy, recovery and actual resource use matter alongside model quality. More agents or broader access are not success metrics on their own.

The public roadmap should remain useful to contributors: each milestone needs an owner, bounded scope, a demonstration and a way to reproduce its checks. The first technical release is the immediate priority; a cross-device ecosystem is a longer-term vision.

Continue with the [roadmap](ROADMAP.md) and [public status](STATUS.md).
