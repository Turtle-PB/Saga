# RELEASE_GATE_V1

Strict release criteria for the current `Saga` browser build on this branch.

## Go / no-go criteria

| Criterion | Status | Decision | Evidence |
|---|---|---|---|
| Builds successfully | PASS | GO | Static site served successfully from `index.html` over local HTTP (`HTTP/1.0 200 OK`). No build pipeline is present on this branch. See `README.md:62-67`, `index.html:1-6`. |
| Runs to playable state | PARTIAL | NO-GO | Title screen loads and `startGame()` enters arc intro flow, but smoke testing also reproduced a rapid transition to `gameover` shortly after intro completion. See `index.html:746-754`, `index.html:756-760`. |
| Core loop is testable end-to-end | MISSING | NO-GO | No automated tests or deterministic browser harness exist for boot → combat → boss clear → next arc. Repository contains no test configuration on this branch. |
| No P0 blockers | FAIL | NO-GO | Current P0 blockers are tracked in `KNOWN_ISSUES.md`, including missing persistence and unvalidated/unstable playable-state behavior. |
| Docs complete and linked | PASS | GO | `README.md` links to readiness, release, known-issues, and narrative docs created in this pass. |
| Known issues captured | PASS | GO | `KNOWN_ISSUES.md` now records open technical and release risks with P0/P1/P2 tags. |

## Release dependencies

Before a `READY` verdict, all of the following should be true:

1. The playable state must be verified as stable through at least one full arc clear.
2. P0 issues in `KNOWN_ISSUES.md` must be fixed or explicitly downgraded with evidence.
3. A save/load decision must be documented: either implemented, intentionally out of scope for v1, or replaced with a clearly documented session-only contract.
4. The core loop must have at least one repeatable validation path (manual script or automated harness).
5. All docs in this pass must remain in sync with the shipped build.

## Final verdict

### NOT READY

### Reasons

- The build serves, but runnable-playable readiness is only **partial**, not fully verified.
- No end-to-end test path exists for the current browser loop.
- P0 blockers remain open.
- Save/load behavior is currently undocumented because it is not implemented.

See also:
- [ENGINE_READINESS_CHECKLIST.md](ENGINE_READINESS_CHECKLIST.md)
- [KNOWN_ISSUES.md](KNOWN_ISSUES.md)
- [ROADMAP.md](ROADMAP.md)
