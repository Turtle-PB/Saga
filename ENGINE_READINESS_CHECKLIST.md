# ENGINE_READINESS_CHECKLIST

This checklist documents the current, verified engine state of `/home/runner/work/Saga/Saga` as of this pass. Anything not directly confirmed in repository code or smoke-tested behavior is marked clearly.

## Boot & startup flow

- **PASS** — Static browser entry point exists and serves successfully from `index.html`.  
  Evidence: `README.md:62-67`, `index.html:1-6`; manual smoke test via local HTTP server returned `HTTP/1.0 200 OK`.
- **PASS** — Title/menu UI renders with arc selection and a start button.  
  Evidence: `index.html:73-88`.
- **PASS** — `startGame()` hides the menu, initializes runtime state, opens intro dialogue, and starts the loop.  
  Evidence: `index.html:746-754`.
- **PARTIAL** — The render/update loop is started once at file load for the menu background and again inside `startGame()`, so runtime pacing is not clearly single-loop safe.  
  Evidence: `index.html:707-710`, `index.html:746-754`, `index.html:831-832`.

## Input handling

- **PASS** — Keyboard movement uses WASD and arrow keys.  
  Evidence: `index.html:243-247`, `index.html:797-807`.
- **PASS** — Mouse aiming and firing are wired to canvas events.  
  Evidence: `index.html:258-265`, `index.html:809-816`.
- **PASS** — Dash input exists on spacebar with cooldown handling.  
  Evidence: `index.html:270-275`.
- **PARTIAL** — Dialogue advance is available on `E` and `Escape`, but the clickable close affordance is bound twice, which can skip dialogue state progression.  
  Evidence: `index.html:68`, `index.html:728-742`, `index.html:797-804`, `index.html:828-829`.

## World/zone loading

- **PARTIAL** — Five playable arcs are hardcoded in `ARCS` with distinct colors, enemy labels, bosses, dialogue, and victory text.  
  Evidence: `index.html:119-206`.
- **PARTIAL** — `init()` resets per-arc combat state and `nextArc()` advances through arcs in sequence.  
  Evidence: `index.html:539-554`, `index.html:780-793`.
- **MISSING** — No external world, zone, map, or asset loading pipeline is present; there is no separate loader contract beyond in-file arc definitions.  
  Evidence: `index.html` contains the only runtime data structure for arcs; repository root has no engine/data directories in this branch.

## Combat loop hooks

- **PASS** — Player, enemy, bullet, particle, and pickup objects all update/draw through the main loop.  
  Evidence: `index.html:227-326`, `index.html:329-358`, `index.html:361-473`, `index.html:475-535`, `index.html:582-710`.
- **PASS** — Wave spawning and boss escalation hooks exist.  
  Evidence: `index.html:556-580`, `index.html:587-593`.
- **PASS** — Damage, collision, pickup healing, score updates, and boss victory transitions are implemented.  
  Evidence: `index.html:313-325`, `index.html:597-649`, `index.html:763-778`.
- **PARTIAL** — Headless smoke testing reached gameplay flow but also reproduced a fast failure path to `gameover`, so end-to-end combat pacing is not yet validated as release-ready.  
  Evidence: `index.html:756-760`; reproduced after intro advancement during manual browser smoke testing.

## Progression hooks

- **PASS** — Arc progression exists through `bossDefeated()` and `nextArc()`.  
  Evidence: `index.html:763-793`.
- **PARTIAL** — Progress is session-only. `completedArcs` and `totalScore` exist in memory but are not persisted.  
  Evidence: `index.html:223-224`, `index.html:758`, `index.html:767`.
- **MISSING** — No documented unlock, checkpoint, inventory, XP, or long-term progression contract exists beyond sequential arc advancement.  
  Evidence: no matching systems are present in `index.html` or other repository files on this branch.

## Save/load contract

- **MISSING** — No save function, load function, persistence adapter, or browser storage contract is implemented.  
  Evidence: no `localStorage`, `save`, or `load` hooks are present in `index.html`; repository has no other runtime source files on this branch.
- **MISSING** — No user-facing documentation explains save behavior, continue behavior, or reset behavior.  
  Evidence: `README.md:69-82` documents controls and features, but not persistence.

## Current blockers

- **MISSING** — No verified save/load contract. This blocks any claim of persistent progression readiness.  
  Evidence: see **Save/load contract** above.
- **PARTIAL** — Playable-state validation is incomplete because smoke testing reproduced a rapid transition to `gameover` shortly after intro completion when the player remains idle. Cause is not fully root-caused in this document, but duplicate loop startup is a plausible contributor.  
  Evidence: `index.html:707-710`, `index.html:746-754`, `index.html:756-760`, `index.html:831-832`.
- **PARTIAL** — Dialogue close behavior is inconsistent between keyboard advance and clicking `[×]` because the close handler is attached twice.  
  Evidence: `index.html:68`, `index.html:828-829`.
- **MISSING** — No automated test harness exists for the browser loop, combat pacing, or arc completion flow.  
  Evidence: repository contains no test files or build/test config on this branch.

## Summary

**Overall status: NOT READY for release gate sign-off.**  
The project boots and exposes a playable-looking browser loop, but world loading is hardcoded, persistence is absent, automated end-to-end validation is absent, and current smoke testing surfaced runtime behavior that should be resolved or explicitly accepted before calling the engine ready.
