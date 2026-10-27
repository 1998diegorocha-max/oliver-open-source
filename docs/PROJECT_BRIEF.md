# DRAGON / OLIVER: project brief

**A Brazilian initiative working toward personal intelligence across user-authorized devices.**

## The problem

An assistant becomes difficult to trust when it submits an unfinished sentence, repeats an action after cancellation or hides which parts of a demonstration actually work. DRAGON starts from those concrete interaction and control problems while exploring a wider cross-device experience.

OLIVER is the personal assistant identity. The initial context is Brazilian Portuguese, accessible hardware and explicit user control. JARVIS is a historical internal development name.

## The public contribution today

[OLIVER Turn Controller](../packages/turn-controller/README.md) is an MIT-licensed building block with source, examples, a local interactive lab and 35 automated cases. It separates transcript processing from request execution and makes submission, review, cancellation and pause decisions inspectable.

Another developer can run it without a model, private repository, API key, package installation or paid subscription. [Technical evidence](TECHNICAL_EVIDENCE.md) states exactly what was tested. It is an early source component, not the complete Android product.

## Distinctive direction

| Focus | Concrete consequence |
| --- | --- |
| Brazilian Portuguese | Examples preserve accents and Portuguese text; speech evaluation needs native-speaker feedback |
| Accessible hardware and operating cost | Small dependency-free components; measure integrations before expanding resource use |
| Control over conversation | Explicit finality, silence, cancellation and review behavior |
| Continuity across authorized devices | Design enrollment, scoped adapters and revocation before claiming broad access |
| Reviewable engineering | Distinguish implementation, reproducible tests, private experiments and future objectives |

These are the project's priorities and choices. The controller uses established state-machine techniques; worldwide technical exclusivity has not been established.

## Next milestones

1. Integrate one explicit recognizer adapter and reproduce realistic interruption scenarios.
2. Measure speech timing and gather human feedback on Brazilian Portuguese quality.
3. Publish a narrowly authorized two-device demonstration with cancellation and recovery.
4. Evaluate context retention and tool permissions with explicit threat boundaries.

The longer-term vision includes phones, computers, wearables and other enrolled environments. Specialized agents, encryption, identity and incident handling remain separately testable engineering work. External incident reports would require human review.

## Stewardship and reach

Diego Rocha de Oliveira leads the initiative, with Vinícius Messias as technical collaborator. The repository uses MIT. No verified download, downstream-dependency or production-deployment figures are published. No provider endorsement, grant acceptance or security certification is claimed.

Start with the [README](../README.md), [public status](STATUS.md) and [roadmap](ROADMAP.md).
