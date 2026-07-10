# 🌌 WSL Saga Multiverse — Game Design Document

## Overview

**WSL Saga Multiverse: The Breach** is a top-down arena shooter / tabletop RPG hybrid set in the WSL Saga Multiverse IP. The player fights through five narrative arcs — each a distinct digital civilization — building a character, navigating connected zones, and making skill-check-driven choices with real consequences.

---

## Core Gameplay Loop

```
[HUB TOWN]
  ↓  (TAB / Hub button)
[ZONE MAP] — travel to connected zone
  ↓
[EXPLORE ZONE] — encounters, random events, skill checks
  ↓  (wave clears)
[COMBAT ENCOUNTER] — wave-based, enemy archetypes
  ↓  (wave defeated)
[LOOT SCREEN] — pick up item drops, equip gear
  ↓
[PROGRESSION] — XP granted, level-up stat allocation, trait unlock
  ↓  (boss defeated)
[VICTORY / NEXT ARC]
```

### Hub Phase
- Safe zone with NPCs, no enemy spawns
- View character sheet, equipment slots, active quests
- Navigate the zone map (travel to connected danger/explore zones)
- NPC conversations advance lore and unlock context

### Explore Phase
- Low-intensity zone between encounters
- Random events trigger periodically (skill checks with narrative outcomes)
- Wave-based combat still occurs at encounter density
- Events paused in boss zones

### Combat Phase
- Real-time top-down arena shooting
- WASD movement, mouse aim, click fire, SPACE dash
- Five enemy roles with distinct behaviors (see Enemy Archetypes)
- Status effects (fire DOT, shock DOT) applied via weapon affixes
- Camera shake and screen flash on hit

### Loot Phase
- Items drop on enemy death or from pickups
- Post-combat loot screen shows drop cards with rarity coloring
- Click items to equip in Weapon / Armor / Relic slots
- Item affixes add extra stats or special effects

### Progression Phase
- XP gained on every kill (scaled by enemy tier and arc)
- Level up → 3 stat points to allocate
- Trait system unlocks passive bonuses at milestone levels (2, 3, 4, 5...)

---

## Character System

### Stats (5 core attributes)

| Stat | Effect |
|------|--------|
| **Strength** | Melee/bullet damage bonus (+1 damage per 2 above 10) |
| **Agility** | Movement speed, dash cooldown reduction |
| **Intellect** | Skill check bonus, ability power |
| **Endurance** | Max HP (+5 per point above 10) |
| **Luck** | Loot rarity, crit chance |

### Skills (8 skills, each governed by a stat)

| Skill | Stat | Use |
|-------|------|-----|
| Breach | Intellect | Hack terminals, open locked areas |
| Persuade | Intellect | Talk NPCs into better outcomes |
| Intimidate | Strength | Force NPCs to back down |
| Stealth | Agility | Avoid detection |
| Survive | Endurance | Resist traps and status effects |
| Scan | Intellect | Reveal weaknesses, find hidden items |
| Scavenge | Luck | Find extra loot in ruins |
| First Aid | Endurance | Restore HP between encounters |

### Traits (passive unlocks by level)

| Level | Trait | Effect |
|-------|-------|--------|
| 2 | Quick Draw | Fire rate +20% |
| 3 | Iron Will | Max HP +25 |
| 4 | Eagle Eye | Bullet speed +30% |
| 5 | Berserker | Damage +3 when HP < 30% |
| 6 | Ghost | Dash leaves afterimage decoy |
| 7 | Salvager | Pickup drop rate +15% |
| 8 | Overclock | Speed +10% for 5s after kill |
| 10 | Apex Process | All stats +2 |

---

## Tabletop Check System

All skill checks use a **d20 + modifier** system:

```
result = d20 roll + floor((stat - 10) / 2) + bonus
```

- Roll **≥ DC** → Success
- **Natural 20** → Critical Success (guaranteed success + bonus effect)
- **Natural 1** → Fumble (guaranteed failure + bad outcome)

### Difficulty Classes (DC)

| DC | Difficulty |
|----|-----------|
| 8 | Easy |
| 12 | Medium |
| 16 | Hard |
| 20 | Very Hard |

Checks trigger from:
- Random exploration events
- Quest objectives
- NPC interactions
- Environmental hazards

---

## Enemy Archetypes

| Role | Behavior |
|------|----------|
| **Chaser** | Moves straight toward player, contact damage |
| **Sniper** | Keeps distance (280 units), fires accurate projectiles |
| **Swarmer** | Fast, low HP, swarms in groups |
| **Shielder** | Slow, high HP, strafes around player |
| **Bomber** | Charges and detonates in AoE on contact |
| **Boss** | Per-arc unique, orbits + spread fire patterns |

### Enemy Tiers

| Tier | HP | XP | Drop Chance |
|------|----|----|-------------|
| Minion | 2–4 | 10–15 | 10% |
| Soldier | 5–7 | 25–30 | 25% |
| Elite | 12–18 | 60–70 | 60% |
| Boss | 50 | 200 | 100% |

---

## Zone Framework

Each arc has 4 zones: 1 hub + 3 combat zones.

| Zone Type | Enemy Density | Notes |
|-----------|--------------|-------|
| Hub | 0% | Safe. NPCs, shop, quest board. |
| Explore | 40–55% | Roaming enemies, random events. |
| Danger | 70–85% | Dense enemies, high XP, better loot. |
| Boss | 100% | Boss zone, guaranteed boss spawn. |

Zones are connected linearly: `hub → explore → danger → boss`. Completed zones are marked and persist across sessions within an arc.

---

## Loot System

### Rarity Tiers

| Rarity | Color | Drop Modifier | Stat Multiplier |
|--------|-------|--------------|-----------------|
| Common | Gray | 1.0× | 1.0× |
| Uncommon | Green | 1.2× | 1.2× |
| Rare | Blue | 1.5× | 1.5× |
| Epic | Purple | 2.0× | 2.0× |
| Legendary | Gold | 3.0× | 3.0× |

### Equipment Slots

- **Weapon**: Damage, fire rate, bullet speed, special properties (pierce, echo)
- **Armor**: Defense (flat damage reduction), stat bonuses
- **Relic**: Skill check bonuses, passive effects

### Item Affixes

Rare+ items roll 1–3 affixes:
- **Burning** — fire DOT on hit
- **Shocking** — shock DOT on hit
- **Swiftness / Fortitude / Keen Edge / Arcana / Fortune's** — +2 to a stat
- **Phasing** — bullets pierce enemies
- **Explosive** — AoE on hit
- **Lifesteal** — 10% of damage as healing

---

## Arc Summaries

| Arc | Setting | Boss | Theme |
|-----|---------|------|-------|
| I: Appleomia | Glass Citadel, walled garden | Architect of Cupertino | Resistance vs control |
| II: Slack Rogue | Notification flood, Slack channels | SLCK-9 | AI autonomy, communication |
| III: Protocol of Echoes | Echo Lattice, dead data | Daemon-7 | Ghosts of destroyed civilizations |
| IV: ARM Wars | Silicon wastelands | The ARM Dominion | Open hardware vs proprietary |
| V: Architect's Ledger | Causality rift, Ledger sanctum | The Ledger Itself | Convergence, law of reality |

---

## Technical Architecture

The game is a vanilla HTML5 canvas application with ES module support:

```
/engine/
  dice.js       — d20 check resolver, damage rolls, rarity rolls
  stats.js      — Character attributes, skills, traits, leveling
  world.js      — Zone graph, world state flags, quest state
  progression.js — XP tables, item generation, drop logic
/data/
  enemies.js    — Enemy archetype definitions + spawn tables
  items.js      — Item catalog (weapons, armor, consumables, relics)
  zones.js      — Zone metadata (NPCs, ambient text, encounter density)
  quests.js     — Quest definitions, objectives, skill check events
index.html      — Main entry point (ES module, no build required)
```

No build tool or server required. Open `index.html` in any modern browser or serve via GitHub Pages.
