# 🗺️ WSL Saga Multiverse — Roadmap

## Current State: Overhaul v1 (Gears branch)

### ✅ Implemented in Overhaul v1

- **Core gameplay loop**: Hub → Explore → Combat → Loot → Progression → Hub
- **Character system**: 5 stats (STR/AGI/INT/END/LCK), 8 skills, 8 traits
- **d20 Tabletop check system**: Modifier-based rolls, DC difficulty, crit/fumble
- **Zone framework**: 20 zones across 5 arcs, typed as hub/explore/danger/boss
- **XP & leveling**: Kill XP by tier + arc, level up, stat point allocation, trait unlocks
- **Loot system**: 5 rarity tiers, item affixes (10 types), equipment slots (weapon/armor/relic)
- **Enemy archetypes**: 6 roles (chaser, sniper, swarmer, shielder, bomber, boss) with distinct AI
- **Quest system**: Main quests, side quests, random exploration events with skill checks
- **Data-driven content**: All enemies/items/zones/quests in separate data files
- **Status effects**: Fire DOT, Shock DOT via weapon affixes
- **Hub screen**: NPC contacts, character sheet, zone map, quest board
- **Skill check screen**: Animated d20 roll, result display, success/fail effects
- **Loot screen**: Post-combat item drops with rarity visualization, click-to-equip
- **Level up screen**: Stat allocation UI, trait unlock announcement
- **HUD upgrades**: XP bar, stat panel, quest log overlay, zone name, level badge
- **World state**: Zone clear tracking, arc completion flags, persistent quest states
- **Documentation**: GAME_DESIGN.md, CONTENT_GUIDE.md, updated README.md

---

## 🔜 Overhaul v2 — Combat & UI Polish

**Priority: High**

- [ ] **Minimap** — Show connected zones, player position, cleared status
- [ ] **Damage number improvements** — Color-coded by type, crit indicators (larger size)
- [ ] **Combo multiplier** — Kill chain bonus to score and XP
- [ ] **Status effect icons** — Visual HUD indicators for active buffs/debuffs
- [ ] **AoE damage visuals** — Explosion ring animation for bomber + explosive affix
- [ ] **Boss phase 2** — Each arc boss gains a second attack pattern at 50% HP
- [ ] **Cooldown abilities** — One active ability per arc (e.g. AoE pulse, teleport dash)
- [ ] **Elite behavior variants** — Elites with unique special moves per archetype
- [ ] **Formation AI** — Groups of soldiers move in coordinated patterns
- [ ] **Environmental hazards** — Zone-specific obstacles (walls, lava tiles, data mines)
- [ ] **Combat log panel** — Last 5 combat events in HUD corner

---

## 🔜 Overhaul v3 — Progression Depth

**Priority: High**

- [ ] **Talent tree** — Per-arc or universal tree with unlockable nodes
- [ ] **Skill rank upgrades** — Skills rank up with use (Rank 1→5 improves modifier)
- [ ] **Inventory management** — Stash items instead of immediate equip/drop
- [ ] **NPC shops** — Buy/sell items in hub zone with score currency
- [ ] **Set items** — Matching set bonuses when 2–3 pieces equipped
- [ ] **Crafting/upgrades** — Combine items to raise rarity tier
- [ ] **Persistent character** — Save/load character state across sessions (localStorage)
- [ ] **Bounty system** — Targeted kill quests with unique item rewards
- [ ] **Reputation system** — Faction standing tracks across arcs

---

## 🔜 Overhaul v4 — World Expansion

**Priority: Medium**

- [ ] **Branching zone paths** — Multiple routes through an arc (stealth vs combat)
- [ ] **Secret zones** — Hidden areas unlocked via skill checks or collectibles
- [ ] **Day/night cycle** — Affects enemy density and event probability
- [ ] **World events** — Time-limited modifiers across zones (enemy surge, double XP)
- [ ] **NPC quests** — Talk-to-NPC to receive side missions with dialogue trees
- [ ] **Lore codex** — Collectible lore fragments that expand the narrative
- [ ] **Faction choices** — Choose sides in arc conflicts, affects later encounters
- [ ] **Escort/defend objectives** — Protect NPCs or structures during waves

---

## 🔜 Overhaul v5 — UI & Polish

**Priority: Medium**

- [ ] **Arc select screen revamp** — Show arc completion, boss preview art
- [ ] **Animated transitions** — Zone travel screen wipe, hub enter/exit animations
- [ ] **Tooltips** — Hover over stats/items for detailed breakdown
- [ ] **Settings panel** — Volume, keybinds, difficulty slider
- [ ] **Colorblind mode** — Alternative color palettes for accessibility
- [ ] **Touch/mobile support** — Virtual joystick and fire button overlay
- [ ] **Controller support** — Gamepad input mapping
- [ ] **Achievement system** — Unlock badges for milestones (no-death arc, etc.)

---

## 🔜 Technical Debt / Deferred

- [ ] **Test framework** — Add Jest tests for engine logic (dice, stats, progression)
- [ ] **TypeScript migration** — Add type safety to engine files
- [ ] **Bundle/build system** — Optional Vite setup for larger-scale development
- [ ] **Performance** — Object pooling for bullets/particles at high enemy counts
- [ ] **Sound engine** — Web Audio API integration for SFX and music
- [ ] **Sprite system** — Image-based sprites to replace canvas primitives
- [ ] **WebWorker AI** — Offload enemy AI calculations for more enemies

---

## Known Limitations (v1)

| Issue | Severity | Mitigation |
|-------|----------|-----------|
| Loot screen only shows drops, no inventory stash | Low | Gear is auto-equip on click |
| No persistent save between page reloads | Low | Planned for v3 (localStorage) |
| Random events only trigger in explore zones | Low | By design for v1 |
| Skill ranks don't improve with use (flat bonus) | Low | Planned for v3 |
| No audio feedback | Low | Planned for v5 |
| Hub zone has no combat (no re-entry to prior zones) | Low | By design for v1 safety |
| Affix DOT effects are not shown visually on enemies | Low | Planned for v2 |

---

## Version History

| Version | Description |
|---------|-------------|
| **v1 (Gears)** | Full Overhaul v1 — RPG systems, zone framework, tabletop checks, loot, progression |
| **Initial** | Single-file arena shooter — 5 arcs, wave enemies, basic dialogue |
