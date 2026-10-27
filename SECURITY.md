# Security policy and design boundaries

## Current scope

This repository currently contains documentation and contribution templates, not a runnable assistant or a supported production service. No independent audit, invulnerability guarantee or production security certification is claimed.

Security objectives in the [vision](docs/VISION.md) are planned work. Encryption alone would not protect a system from unsafe permissions, compromised endpoints, stolen credentials or software defects.

## Reporting a concern

Please keep vulnerability details and personal information out of public issues.

1. If GitHub private vulnerability reporting is enabled for this repository, use its Security reporting interface.
2. If that option is unavailable, open a minimal issue titled **Security contact requested**, without exploit details, credentials or identifying data. The maintainer will need to establish a private channel before receiving sensitive information.
3. Once a private channel is agreed, provide the affected public revision, a minimal reproduction, impact and environment. Redact secrets and unrelated data.

There is currently no published response-time guarantee or bounty program. This policy does not grant permission to test private DRAGON deployments, third-party systems or other people's devices.

## Planned safeguards

The proposed architecture separates model suggestions from tool authorization. Tools should have narrowly defined operations and limited credentials. High-impact actions should have explicit approval and a clear way to cancel or revoke access.

Cryptographic protection and key lifecycle, update integrity, isolation and evidence handling require implementation and testing before they can be described as operational safeguards.

## Planned incident response

The intended sequence is to assess the signal, constrain the affected local operation, notify the owner, preserve necessary evidence and support recovery. Signals can be mistaken and need evaluation.

An incident report for a provider, platform or competent authority would be prepared for human review and authorized submission. Automatic defensive containment is a research objective; automatic accusations or external reporting are not implemented features.

## Design references

- [NIST SP 800-207: Zero Trust Architecture](https://csrc.nist.gov/pubs/sp/800/207/final)
- [OWASP: Excessive Agency](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/)

These references inform design discussions. Citing them does not imply compliance, certification or an audit of this project.
