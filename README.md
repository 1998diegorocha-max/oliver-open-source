# DRAGON · OLIVER Open Source

**Personal intelligence across your devices. Under your control.**

[Português brasileiro](README.pt-BR.md) · [Project status](docs/STATUS.md) · [Vision](docs/VISION.md) · [Roadmap](docs/ROADMAP.md) · [Contributing](CONTRIBUTING.md) · [Security](SECURITY.md)

DRAGON is a Brazilian initiative developing a vision for personal AI that connects conversation, user-controlled memory and useful automation across devices. OLIVER is its user-facing assistant. JARVIS is the project's historical internal development name.

Our starting point is Brazilian Portuguese, accessible hardware and practical assistance in everyday workflows. Our longer-term ambition is a coordinated experience across phones, computers, wearables and other environments explicitly enrolled by their owners.

> **Public stage: documentation and design.** This repository currently publishes the project foundation, MIT license, roadmap and contribution guidance. It does not yet contain a runnable assistant, reusable software modules or a public product release. Related private prototyping is separate and is not reproducible from this repository.

## What we are working toward

| Direction | Intended value |
| --- | --- |
| Natural conversation | Useful voice and text experiences in Brazilian Portuguese |
| User-controlled context | Explicit choices about what is remembered, shared or deleted |
| Accessible local AI | Evaluate components against real hardware, language support and operating cost |
| Cross-device continuity | Carry authorized tasks between enrolled devices |
| Supervised agents | Narrow permissions, reviewable actions and understandable execution records |
| Reusable public components | Small releases with examples, tests and clear limits |

The roadmap describes goals, not completed capabilities. Voice quality, autonomous development, broad device integration and production security remain engineering and validation work.

## Security as an engineering discipline

We aim to build layered protection: authenticated devices, protected keys, scoped access, isolated tools and auditable decisions. Cryptography is one control within that design. We make no claim that the project is unhackable or independently certified.

The proposed incident workflow is detection, defensive containment, owner notification and evidence preservation. Reports intended for external recipients would require human review. See the [security policy and threat boundaries](SECURITY.md).

## Explore and contribute

- [Vision and proposed architecture](docs/VISION.md)
- [Delivery roadmap and acceptance criteria](docs/ROADMAP.md)
- [What is public and what remains planned](docs/STATUS.md)
- [How to propose a useful contribution](CONTRIBUTING.md)

Our next technical milestone is a first reusable module with a reproducible example and automated tests. No package installation or runtime setup is currently required to read this repository.

## People and licensing

Diego Rocha de Oliveira — founder and project lead. Vinícius Messias — technical collaborator.

Public material in this repository is provided under the [MIT License](LICENSE). Private DRAGON/JARVIS product code, third-party models and external services are not included by that license. Their availability, licenses, quotas and costs must be evaluated separately.

This is an independent project. No affiliation, endorsement or security certification from an AI provider is claimed.
