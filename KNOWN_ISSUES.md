# KNOWN_ISSUES

Open risks, technical debt, and deferred work identified during this pass.

## P0

- **P0 — Save/load contract is absent.**  
  No persistence layer, continue flow, or player-facing save behavior is implemented or documented. Current progression is session-only.  
  Evidence: `index.html` contains no `save`, `load`, or `localStorage` usage.

- **P0 — Playable-state stability is not fully validated.**  
  Smoke testing confirmed boot and intro flow, but also reproduced a rapid transition to `gameover` shortly after intro completion when the player remained idle. This blocks a confident “playable state” release claim until the behavior is root-caused and re-tested.  
  Evidence: runtime behavior observed during local browser smoke test; related flow in `index.html:707-710`, `index.html:746-760`, `index.html:831-832`.

## P1

- **P1 — Dialogue close control is double-bound.**  
  Clicking `[×]` invokes `closeDialogue()` through both inline markup and a scripted event listener, which can skip a dialogue step.  
  Evidence: `index.html:68`, `index.html:828-829`.

- **P1 — World structure is embedded, not loaded.**  
  Arcs are hardcoded in a single HTML file; there is no separate world/zone loading contract or content pipeline.  
  Evidence: `index.html:119-206`.

- **P1 — No automated test harness.**  
  There is no repository-native test suite for gameplay, progression, or regression checks on this branch.  
  Evidence: repository root contains no test or build configuration files.

## P2

- **P2 — Offline mirror not separately verified.**  
  `WSL_Saga_Multiverse_Game.html` exists as a self-contained download target, but this pass only smoke-tested `index.html`.  
  Evidence: `README.md:66-67`; file present at repository root.

- **P2 — Narrative canon is broader in README marketing copy than in the implemented build.**  
  The README references a larger IP scope than the currently verifiable playable content. Docs in this pass are scoped to in-repo, confirmed material only.  
  Evidence: `README.md:132-136`.
