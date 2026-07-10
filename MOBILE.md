# 📱 WSL Saga Multiverse — Mobile & Touch Guide

> Playing *The Breach* on a phone or tablet.

---

## ▶️ [PLAY IN BROWSER — NO DOWNLOAD](https://turtle-pb.github.io/Saga/)

The game runs directly in your mobile browser. No app install required.

---

## 📲 Touch Controls Layout

```
┌────────────────────────────────────────────────┐
│                                                │
│                  GAME AREA                     │
│                                                │
│                                                │
│  ┌───────────────┐         ┌────────────────┐  │
│  │               │         │ HOLD = FIRE    │  │
│  │  LEFT HALF    │         │ TOUCH = AIM    │  │
│  │  (joystick)   │         │ RIGHT HALF     │  │
│  │               │         │                │  │
│  └───────────────┘         └────────────────┘  │
│                                  [ E ] [DASH]  │
└────────────────────────────────────────────────┘
```

### Virtual Joystick (Left Side)

- **Touch anywhere on the left 45% of the screen** to place the joystick at that point.
- **Drag** to move your character in any direction.
- **Release** to stop moving — the joystick disappears.
- A cyan circle (base) and a white knob indicate joystick position.

### Aim + Fire (Right Side)

- **Touch the right 55% of the screen** to both aim and fire.
- Your character automatically faces the touch point.
- **Hold** the touch to fire continuously.
- Lift your finger to stop firing.
- A dim red zone hint shows the fire area (fades while actively firing).

### DASH Button

- Located at the **bottom-right corner** of the screen.
- Tap to perform a speed dash in your current movement direction.
- Dash has a ~1-second cooldown (shown as a ring around your player).

### [ E ] (Interact / Advance Dialogue)

- Located above the DASH button.
- Tap to advance or close dialogue boxes.
- You can also **tap anywhere on the canvas** to advance dialogue.

---

## 🔄 Auto-Aim

In touch mode, when you are **not actively touching the fire zone**, your character **auto-aims at the nearest enemy**. This helps on small screens where precise aiming is difficult.

When you actively touch the right side, manual aim takes over.

---

## 📐 Orientation & Resolution

| Orientation | Support |
|-------------|---------|
| Landscape | ✅ Recommended |
| Portrait | ⚠️ Playable but cramped |

**Recommended**: Play in **landscape mode** for best experience. The game canvas fills the full screen and scales automatically to any resolution.

> **Tip:** Lock your phone to landscape in Control Center / Quick Settings for the smoothest experience.

### Responsive UI

- The top HUD (health bar, score, arc name) scales down on screens narrower than 768 px.
- Dialogue text uses smaller fonts on narrow screens.
- Start screen title, buttons, and arc selectors all scale for mobile.

---

## 📱 Supported Devices & Browsers

### Browsers

| Browser | Android | iOS/iPadOS |
|---------|---------|-----------|
| Chrome | ✅ Excellent | ✅ Good |
| Firefox | ✅ Good | ⚠️ Limited (iOS engine) |
| Safari | N/A | ✅ Excellent (iOS 16.4+) |
| Samsung Internet | ✅ Good | N/A |
| Edge | ✅ Good | ✅ Good |

### Devices

| Category | Status |
|----------|--------|
| Modern phones (2019+) | ✅ Full support |
| Tablets (iPad, Android) | ✅ Full support |
| Older phones (pre-2018) | ⚠️ May lag on heavy waves |
| Small phones (< 5" screen) | ⚠️ Controls may feel cramped |

---

## ⚠️ Known Limitations

| Limitation | Details |
|------------|---------|
| No haptic feedback | Controller vibration/haptics not currently implemented |
| Portrait mode cramped | The fire zone and joystick overlap slightly on tall narrow screens |
| No custom button layout | Touch button positions are fixed; layout editor planned for future |
| iOS PWA fullscreen | Safari does not support the Fullscreen API — use "Add to Home Screen" for a near-fullscreen experience |
| Multi-touch limit | More than 2 simultaneous touches may not all register on some devices |

---

## 💡 Tips for Mobile Play

1. **Landscape is king** — rotate your phone before starting.
2. **Adjust brightness** — the game uses dark backgrounds; higher brightness helps visibility.
3. **Close background apps** — for smoother frame rates on older devices.
4. **Use Wi-Fi** — the game is hosted on GitHub Pages; mobile data may introduce initial load latency.
5. **Add to Home Screen** — in Safari (iOS) or Chrome (Android) for a fullscreen-like experience.

---

## 🔧 Performance Notes

The game renders on an HTML5 `<canvas>` at native screen resolution. On high-DPI mobile screens this is efficient because the canvas is sized to `window.innerWidth × window.innerHeight`. No external assets are loaded during gameplay — all graphics are drawn in JavaScript.

If you experience frame drops:
- Close other browser tabs.
- Restart the browser before playing.
- On Android, ensure "Battery Saver" mode is **off** (it can throttle GPU).

---

*© 2026 P&B DevCo · WSL Saga Multiverse™ · Paul Adcock*
