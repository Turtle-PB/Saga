# ROADMAP

Current milestones and dependencies for getting the browser build to a defensible v1 release gate.

## Milestone 1 — Readiness baseline

- [x] Inventory current runtime and docs state
- [x] Add engine readiness checklist
- [x] Add release gate definition
- [x] Add known issues register
- [x] Add narrative reference docs

Dependencies:
- [ENGINE_READINESS_CHECKLIST.md](ENGINE_READINESS_CHECKLIST.md)
- [RELEASE_GATE_V1.md](RELEASE_GATE_V1.md)
- [KNOWN_ISSUES.md](KNOWN_ISSUES.md)

## Milestone 2 — Playable-state verification

- [ ] Reproduce and root-cause rapid `gameover` behavior after intro completion
- [ ] Verify one full arc clear in the browser
- [ ] Verify arc-to-arc transition through `nextArc()`
- [ ] Decide whether click-to-close dialogue should mirror keyboard behavior

Release gate dependency:
- Required for `Runs to playable state`
- Required for `No P0 blockers`

## Milestone 3 — Persistence decision

- [ ] Decide whether v1 is session-only or requires save/load
- [ ] If session-only, document that as an explicit product constraint
- [ ] If persistent, implement and test the contract

Release gate dependency:
- Required for `No P0 blockers`
- Required for readiness documentation accuracy

## Milestone 4 — Repeatable validation

- [ ] Add a lightweight repeatable validation path for boot and core loop behavior
- [ ] Document the exact validation steps in `README.md` or a future contributor guide

Release gate dependency:
- Required for `Core loop is testable end-to-end`

## Current target

**Near-term target: move from documentation-complete / runtime-partial to evidence-backed NOT READY → READY transition by closing P0 items first.**
