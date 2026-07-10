# WSL Saga Multiverse — C++ / Dear ImGui / Emscripten Engine

This directory contains a full C++ port of the *WSL Saga Multiverse* game,
compiled to **WebAssembly** via [Emscripten](https://emscripten.org/) and
rendered entirely through **[Dear ImGui](https://github.com/ocornut/imgui)**.

## Architecture

| Component | Role |
|-----------|------|
| **SDL2** | Window creation, event handling, OpenGL context |
| **OpenGL ES 2 / WebGL 1** | GPU back-end (provided by Emscripten in the browser) |
| **Dear ImGui** (submodule `imgui/`) | All rendering — game canvas via `GetBackgroundDrawList()`, UI via `ImGui::Begin()` windows |
| **Emscripten** | C++ → WebAssembly + JS glue compilation |

```
cpp/
├── imgui/                   ← Dear ImGui (git submodule)
├── src/
│   ├── main.cpp             ← Full game engine (~600 lines)
│   └── game_arcs.h          ← Arc/level data (C++ port of js/game-config.js)
├── shell.html               ← Custom Emscripten HTML shell
├── Makefile.emscripten      ← Emscripten (WASM) build
├── Makefile.native          ← Native SDL2+GL build (Linux/macOS)
└── README.md                ← This file
```

## Building for WebAssembly (Emscripten)

### 1 — Install Emscripten SDK

```sh
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh        # Linux / macOS
# emsdk_env.bat              # Windows
```

### 2 — Build

```sh
cd cpp
make -f Makefile.emscripten
```

Output files appear in `cpp/web/`:

| File | Description |
|------|-------------|
| `saga.html` | Browser launcher (Emscripten shell) |
| `saga.js`   | JavaScript runtime / GL glue |
| `saga.wasm` | WebAssembly binary |

### 3 — Serve locally

```sh
make -f Makefile.emscripten serve
# Then open http://localhost:8000
```

> **Note:** WebAssembly requires a proper HTTP server — opening `saga.html`
> directly as a `file://` URL will not work (browser CORS restriction).

## Building Natively (Linux / macOS)

```sh
# Linux (Debian/Ubuntu)
sudo apt install libsdl2-dev libgl1-mesa-dev

# macOS (Homebrew)
brew install sdl2

# Build
cd cpp
make -f Makefile.native
./saga
```

## Gameplay

Controls match the JavaScript version:

| Input | Action |
|-------|--------|
| **WASD** / **Arrow keys** | Move |
| **Mouse** | Aim |
| **Left click** | Shoot |
| **Space** / **Shift** | Dash (1.2 s cooldown) |

## Game Features

* 5 Arcs, each with a unique colour palette, enemy type, boss, and dialogue
* Dear ImGui overlay HUD: health bar, score, arc name
* Dear ImGui dialogue windows: story text with continue/close buttons
* Dear ImGui start screen: arc selector + controls reference
* Game-over and victory screens rendered in Dear ImGui windows
* Particle explosions, pickup drops, boss HP ring — all via `ImDrawList`
* Dash with invincibility frames, squared-distance collision (`circleCollides`)

## CI

The [Emscripten build workflow](../.github/workflows/emscripten-build.yml) runs
automatically on every push that touches `cpp/**` and uploads the built WASM
artefacts (`saga.html`, `saga.js`, `saga.wasm`) as a GitHub Actions artefact.

## Submodule

Dear ImGui is tracked as a git submodule at `cpp/imgui/`.
After cloning the repo, run:

```sh
git submodule update --init --recursive
```
