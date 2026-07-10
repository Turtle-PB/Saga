# GAME_DESIGN

This file aligns the current playable implementation with its narrative intent.

## Current implementation summary

The branch currently ships a **single-page browser shooter** with:

- Arc selection from a start menu
- Intro dialogue per arc
- Arena combat with waves and one boss escalation
- Score, health, pickups, and sequential arc progression

Primary evidence:
- `index.html:73-88`
- `index.html:539-580`
- `index.html:714-793`

## Narrative-to-system alignment

| Narrative intent | Current system support | Status |
|---|---|---|
| Five distinct multiverse arcs | Five hardcoded arc definitions with unique visuals, enemies, bosses, and victory text | Implemented |
| Faction-driven conflict | Arc intros frame each conflict through named forces and ideologies | Implemented at intro-text level |
| A continuous Breach journey | `nextArc()` advances linearly through all five arcs | Implemented |
| Recoverable resources amid combat | Data fragments restore health and increase score | Implemented |
| Persistent multiverse progression | Session-only totals and completed arcs exist, but there is no persistence | Missing |
| Deep world simulation / zone traversal | No external world loader, map system, or travel layer exists in this branch | Missing |

## Design constraints visible in the current build

- The game is structured as an **arena shooter**, not yet a broader exploration RPG or world-simulation engine.
- Narrative delivery is currently **front-loaded into arc intro and victory text**, not conversation trees or quest logs.
- Progression is **short-session oriented** because save/load is absent.

## Documentation alignment targets

For this pass, narrative docs are intentionally scoped to what is verifiable in:

- `README.md`
- `index.html`
- the file-level offline mirror `WSL_Saga_Multiverse_Game.html` (present but not separately smoke-tested)

See also:
- [ENGINE_READINESS_CHECKLIST.md](ENGINE_READINESS_CHECKLIST.md)
- [RELEASE_GATE_V1.md](RELEASE_GATE_V1.md)
- [KNOWN_ISSUES.md](KNOWN_ISSUES.md)
