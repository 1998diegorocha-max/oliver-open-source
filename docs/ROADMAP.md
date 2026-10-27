# Roadmap

The checkboxes below describe this public repository. They do not certify private prototypes or promise release dates.

## Foundation

- [x] Publish a project identity and MIT license.
- [x] Explain the current public stage in English and Brazilian Portuguese.
- [x] Publish contribution, security and review guidance.
- [x] Separate implemented public material from future architecture.

## First reusable technical release

- [ ] Select one narrowly scoped component through a documented proposal.
- [ ] Publish its source with dependency and license information.
- [ ] Provide a small example that runs from a clean checkout.
- [ ] Add automated checks for normal operation and relevant failure cases.
- [ ] Document resource use, supported environments and known limitations.
- [ ] Tag a public release and publish reproduction instructions.

**Acceptance:** another contributor can follow the instructions, run the example and reproduce the checks without private files, hidden credentials or access to the private product repository.

## Portuguese-language assistance and integration

- [ ] Establish representative Brazilian Portuguese conversation scenarios.
- [ ] Measure voice latency and collect human quality feedback.
- [ ] Demonstrate an explicitly authorized task moving between two test devices.
- [ ] Exercise cancellation, interrupted connections and recovery without duplicate actions.

**Acceptance:** publish the tested versions, environment, measurements and unresolved failures. A simulated test is labeled as simulated.

## Security and agent evaluation

- [ ] Publish a threat model for the selected component.
- [ ] Test permission boundaries and malicious or ambiguous instructions.
- [ ] Demonstrate revocation and incident recovery in an isolated environment.
- [ ] Obtain external review before making broader security claims.

**Acceptance:** a demonstration shows which operation was allowed or denied, why, and how the owner can stop or recover it. Additional devices and agents remain optional until they add demonstrated value.
