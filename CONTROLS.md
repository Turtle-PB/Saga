# 🎮 WSL Saga Multiverse — Controls Reference

> Full input mapping for all supported input methods.

---

## ⌨️ Keyboard + Mouse (Default)

| Action | Key / Button |
|--------|-------------|
| Move Up | `W` or `↑` Arrow |
| Move Down | `S` or `↓` Arrow |
| Move Left | `A` or `←` Arrow |
| Move Right | `D` or `→` Arrow |
| Aim | Mouse cursor |
| Fire | Left Mouse Button (hold) |
| Dash | `Space` |
| Advance Dialogue | `E` or `Escape` |

---

## 🎮 Gamepad / Controller

The game uses the standard **Web Gamepad API** and supports Xbox, PlayStation, and generic USB/Bluetooth controllers.

| Action | Button / Axis |
|--------|--------------|
| Move | Left Analog Stick |
| Aim | Right Analog Stick (when moved) |
| Auto-aim | Automatic — nearest enemy when right stick is idle |
| Fire | **RT** (Right Trigger) or **A** / **✕** button |
| Dash | **B** / **○** button or **LB** (Left Bumper) |
| Advance Dialogue | **X** / **□** or **Y** / **△** button |

### Deadzone & Sensitivity

| Setting | Value |
|---------|-------|
| Analog deadzone | `0.18` (18% of axis range; inner dead area to prevent drift) |
| Fire trigger threshold | `0.25` (RT must be pressed 25% to fire) |

> **Note:** Deadzone is applied to both axes independently. Values are hardcoded for now; per-controller remapping is planned for a future update.

### Gamepad Auto-Detection

- The game detects controller connect/disconnect events automatically via `gamepadconnected` / `gamepaddisconnected` browser events.
- On connect, input mode switches to **GAMEPAD** and the HUD badge updates.
- On disconnect, input mode reverts to **KEYBOARD**.
- A badge in the top-right HUD corner shows the active input mode (`⌨ KEYBOARD`, `🎮 GAMEPAD`, or `👆 TOUCH`).

### Supported Controllers (tested)

| Controller | Status |
|-----------|--------|
| Xbox One / Series (Bluetooth + USB) | ✅ Supported |
| Xbox 360 (USB) | ✅ Supported |
| DualShock 4 / DualSense (Chrome/Edge) | ✅ Supported |
| Generic USB HID Gamepad | ✅ Supported (standard mapping) |
| Nintendo Switch Pro Controller | ⚠️ Partial (button order differs) |

> **Browser requirements:** Gamepad API is supported in Chrome 21+, Firefox 29+, Edge 12+, and Safari 16.1+. Not available in older browsers — keyboard/mouse fallback activates automatically.

### Fallback Behaviour

If the Gamepad API is unavailable (`navigator.getGamepads` is not a function) the game silently falls back to keyboard + mouse. No errors are thrown.

---

## 👆 Touch / Mobile

See **[MOBILE.md](MOBILE.md)** for the full touch control layout, device support, and tips.

Quick summary:

| Action | Touch Gesture |
|--------|--------------|
| Move | Left-side joystick (touch and drag) |
| Aim + Fire | Touch right side of screen (hold to fire) |
| Dash | **DASH** button (bottom-right overlay) |
| Advance Dialogue | Tap anywhere, or tap **[ E ]** button |

---

## 🔀 Auto Input-Mode Switching

The game automatically switches input mode on first use:

- First keyboard/mouse event → **KEYBOARD** mode
- Gamepad connect or analog stick/button press → **GAMEPAD** mode
- Touch event on canvas → **TOUCH** mode

Hints in the HUD and on the start screen update instantly when the mode changes.

---

## 🛠️ Troubleshooting

### Controller not detected
1. Connect the controller **before** opening the game page, or plug it in and press any button.
2. Some browsers require a button press to activate the gamepad — press any button on your controller.
3. Check that the browser supports the Gamepad API (Chrome, Firefox, Edge, Safari 16.1+).
4. If using Bluetooth, ensure the controller is paired and connected to the OS first.

### Controller drifting
- The deadzone is set to `0.18` (18%). If your controller drifts beyond that, this indicates hardware wear.
- Try recalibrating your controller in your OS settings.

### Touch controls not showing
- Touch controls appear automatically when a touch event is detected on the canvas.
- If they don't appear, try tapping the **game canvas** (not a UI button).
- Ensure you are using a touch-enabled browser on a touch device.

### Lag or performance on mobile
- Close background apps/tabs.
- Use Chrome or Safari for best canvas performance on mobile.
- Reduce screen brightness to manage heat on lower-end phones.

---

*© 2026 P&B DevCo · WSL Saga Multiverse™ · Paul Adcock*
