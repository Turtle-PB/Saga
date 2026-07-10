# 📋 CHANGELOG — WSL Saga Multiverse

All notable changes to this project are documented here.

---

## [Unreleased] — 2026

### Added

#### 🎮 Game Controller Support
- Full **Web Gamepad API** integration for USB/Bluetooth controllers
- Left analog stick → player movement (with `0.18` deadzone)
- Right analog stick → manual aim; idle right stick activates **auto-aim** to nearest enemy
- **RT** (Right Trigger, threshold `0.25`) or **A/✕** button → fire
- **B/○** button or **LB** (Left Bumper) → dash
- **X/□** or **Y/△** button → advance dialogue
- Edge-detection on dash/interact buttons (no key-repeat on hold)
- Gamepad **connect / disconnect** events with automatic input-mode switching
- Graceful fallback when `navigator.getGamepads` is unavailable (older browsers)

#### 📱 Mobile Touch Controls
- **Virtual joystick** on the left side of the canvas (spawns at touch point, follows drag)
- **Aim + fire zone** on the right side (touch point = aim direction; hold = continuous fire)
- **DASH** overlay button (bottom-right, single-tap triggers dash with cooldown)
- **[ E ]** overlay button for dialogue advancement on mobile
- **Auto-aim** toward nearest enemy in touch mode when fire zone is not held
- Canvas joystick drawn directly in game (base ring + knob)
- Subtle fire-zone hint overlay (only visible in touch mode)
- `touchcancel` handler to safely release all touch state
- All touch listeners use `{ passive: false }` + `preventDefault()` to block scroll/zoom during gameplay

#### 🔀 Cross-Platform Input Polish
- **Input mode auto-detection**: switches between `keyboard`, `gamepad`, and `touch` on first use
- **HUD badge** (top-right, `⌨ KEYBOARD` / `🎮 GAMEPAD` / `👆 TOUCH`) shows active input method
- Start-screen control hint updates dynamically to match active input mode
- `setInputMode()` function centralises all mode transitions

#### 📐 Mobile Responsive UI
- `@media (max-width: 768px)` styles for HUD, dialogue, start screen, and buttons
- Scaled-down health bar, font sizes, and button padding on mobile screens
- Dialogue panel font size reduced for narrow displays

#### 📝 Documentation
- **CONTROLS.md** — full mapping for keyboard/mouse, gamepad, and touch; deadzone/sensitivity table; troubleshooting guide
- **MOBILE.md** — touch layout diagram, orientation tips, browser/device compatibility table, known limitations
- **README.md** — updated with supported input methods, controls quick reference, links to CONTROLS.md and MOBILE.md
- **CHANGELOG.md** — this file

---

## [1.0.0] — 2026-07 (Initial Release)

### Added
- HTML5 canvas arena shooter: *WSL Saga Multiverse — The Breach*
- 5 playable arcs (Appleomia, Slack Rogue, Protocol of Echoes, ARM Wars, Architect's Ledger)
- Wave-based enemy spawning with boss fights
- Keyboard + mouse controls (WASD/Arrows, mouse aim, click to fire, Space to dash)
- Dialogue system with speaker names and story lore
- Score tracking and arc progression
- Self-contained offline version (`WSL_Saga_Multiverse_Game.html`)
- GitHub Pages deployment (`https://turtle-pb.github.io/Saga/`)
- Cinematic trailer (`WSL_Saga_Multiverse_Trailer.mp4`)

---

*© 2026 P&B DevCo · WSL Saga Multiverse™ · Paul Adcock · All Rights Reserved*
