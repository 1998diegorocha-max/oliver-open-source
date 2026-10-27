# Roadmap

The checkboxes below describe this public repository. They do not certify private prototypes or promise release dates.

## Foundation

- [x] Publish a project identity and MIT license.
- [x] Explain the current public stage in English and Brazilian Portuguese.
- [x] Publish contribution, security and review guidance.
- [x] Separate implemented public material from future architecture.

## First reusable technical release

- [x] Select the turn controller through [Proposal 001](proposals/001-turn-controller.md).
- [x] Publish its source with dependency and license information.
- [x] Provide CLI and interactive examples that run from a clean checkout.
- [x] Add 35 automated cases for normal operation and relevant failure boundaries.
- [x] Document supported test environments, dependency count and limitations.
- [ ] Benchmark resource use and real speech timing.
- [x] Publish reproduction instructions and a component-specific source tag, `turn-controller-v0.1.0`.

**Acceptance:** another contributor can follow the instructions, run the example and reproduce the checks without private files, hidden credentials or access to the private product repository.

## Portuguese-language assistance and integration

- [ ] Establish representative Brazilian Portuguese conversation scenarios.
- [ ] Measure voice latency and collect human quality feedback.
- [ ] Demonstrate an explicitly authorized task moving between two test devices.
- [ ] Exercise cancellation, interrupted connections and recovery without duplicate actions.

**Acceptance:** publish the tested versions, environment, measurements and unresolved failures. A simulated test is labeled as simulated.

## Security and agent evaluation

- [x] Publish a [threat model](THREAT_MODEL.md) for the selected component.
- [ ] Test permission boundaries and malicious or ambiguous instructions.
- [ ] Demonstrate revocation and incident recovery in an isolated environment.
- [ ] Obtain external review before making broader security claims.

**Acceptance:** a demonstration shows which operation was allowed or denied, why, and how the owner can stop or recover it. Additional devices and agents remain optional until they add demonstrated value.
