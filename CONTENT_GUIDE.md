# 📋 WSL Saga Multiverse — Content Guide

This guide explains how to add new content (enemies, items, zones, quests, events) to the game without changing engine code.

---

## Project Structure

```
/data/
  enemies.js   — Enemy archetypes and spawn tables
  items.js     — Item catalog
  zones.js     — Zone metadata (NPCs, ambient text, encounter density)
  quests.js    — Quests, side quests, and random events
/engine/
  dice.js      — Dice/check system (do not edit for content)
  stats.js     — Character model (do not edit for content)
  world.js     — Zone graph definition (edit to add new zones)
  progression.js — XP and loot (do not edit for content)
```

---

## Adding a New Enemy

Open `data/enemies.js` and add an entry to the `ENEMIES` array:

```javascript
{
  id: 'my_new_enemy',        // unique snake_case ID
  arc: 2,                    // arc index (0–4), matches arc array
  name: 'My Enemy Name',     // display name
  tier: 'soldier',           // 'minion' | 'soldier' | 'elite' | 'boss'
  role: 'chaser',            // 'chaser' | 'sniper' | 'swarmer' | 'shielder' | 'bomber' | 'boss'
  r: 13,                     // collision radius (pixels)
  health: 6,                 // hit points
  speed: 1.0,                // movement speed (px/frame)
  fireRate: 90,              // frames between shots
  bulletSpeed: 250,          // bullet speed
  damage: 8,                 // bullet/contact damage
  color: '#44ffaa',          // CSS color for body
  xp: 25,                    // XP granted on kill
  spawnZones: ['zone_id_1'], // zones where this enemy can spawn
}
```

### Tiers and recommended stats

| Tier | Health | XP | Speed |
|------|--------|----|-------|
| minion | 2–4 | 10 | 1.2–1.8 |
| soldier | 5–8 | 25 | 0.8–1.2 |
| elite | 12–20 | 60 | 0.5–0.9 |
| boss | 40–60 | 200 | 0.8–1.2 |

### Roles and behaviors

| Role | Notes |
|------|-------|
| `chaser` | Runs straight at player, contact damage |
| `sniper` | Keeps 280px distance, fires accurate shots |
| `swarmer` | Fast rush, swarms in numbers |
| `shielder` | Strafes, high HP, fires periodically |
| `bomber` | Charges player, AoE explodes on contact |
| `boss` | Orbits + spread shot, has HP bar |

---

## Adding a New Item

Open `data/items.js` and add to the `ITEMS` array:

```javascript
{
  id: 'my_item_id',          // unique ID (used in quest rewards)
  name: 'My Item Name',
  type: 'weapon',            // 'weapon' | 'armor' | 'consumable' | 'relic'
  arc: 2,                    // -1 = drops in any arc, 0–4 = arc-specific
  description: 'A brief item description.',
  baseStats: {
    strength: 2,             // optional stat bonuses (any of 5 stats)
    agility: 1,
  },
  // weapon-only fields:
  damage: 12,
  fireRate: 14,              // frames between shots (lower = faster)
  bulletSpeed: 460,
  pierce: false,             // true = bullets pierce enemies
  // armor-only fields:
  defense: 2,                // flat damage reduction
  // consumable-only fields:
  use: { heal: 30, xp: 50 }, // effect when used
  // relic-only fields:
  skillBonus: 2,             // bonus to all skill checks
}
```

### Rarity note
Items are assigned rarity at drop time by the engine (dice.js `rollRarity(luck)`). You don't set rarity in the item definition — the engine handles it and scales stats automatically.

---

## Adding a New Zone

### Step 1 — Add the zone to `engine/world.js`

Add an entry to the `ZONES` array:

```javascript
{
  id: 'zone_my_zone',         // unique ID
  arc: 2,                     // arc index
  type: 'explore',            // 'hub' | 'explore' | 'danger'
  name: 'My Zone Name',
  connects: ['hub_echo_lattice', 'zone_recursion_field'], // bidirectional links
  boss: false,                // true if boss spawns here
}
```

> **Note:** Connections must be listed in both zones for bidirectional travel.

### Step 2 — Add metadata to `data/zones.js`

```javascript
zone_my_zone: {
  bgColor: '#0a1010',
  accent: '#44ddcc',
  ambientText: 'A description players see in the hub.',
  npcs: [
    { id: 'my_npc', name: 'My NPC', dialogue: 'NPC dialogue.', shop: false },
  ],
  encounterChance: 0.5,        // 0.0–1.0 encounter probability
  bgPattern: 'grid',           // 'grid' | 'hex'
},
```

### Step 3 — Add enemies that spawn there

In `data/enemies.js`, add your zone ID to the `spawnZones` array of any enemy:

```javascript
spawnZones: ['zone_my_zone', 'zone_existing_zone'],
```

---

## Adding a New Quest

Open `data/quests.js` and add to the `QUESTS` array:

```javascript
{
  id: 'my_quest_id',
  arc: 2,                         // 0–4 for arc, -1 for any arc
  type: 'main',                   // 'main' | 'side' | 'event'
  title: 'My Quest Title',
  description: 'What the player needs to do.',
  objectives: [
    {
      type: 'kill',               // 'kill' | 'reach' | 'collect' | 'survive' | 'check'
      target: 'echo_entity',      // enemy ID for 'kill' type
      count: 10,
      label: 'Destroy Echo Entities',
    },
  ],
  reward: {
    xp: 100,
    item: 'lattice_armor',        // item ID (optional)
  },
  prerequisite: 'echoes_main_1',  // optional: quest ID that must be complete first
}
```

### Skill Check Objective

```javascript
{
  type: 'check',
  skill: 'breach',                // skill from engine/stats.js SKILLS
  dc: 14,                         // difficulty class
  label: 'Breach the terminal',
  successEffect: {
    xp: 80,
    item: 'echo_lance',
    heal: 20,
    message: 'You crack the terminal open.',
  },
  failEffect: {
    damage: 15,
    message: 'The terminal shocks you. Security response incoming.',
    waves: 1,                     // trigger N waves of enemies
  },
}
```

### Random Event (type: 'event')

Events with `arc: -1` can trigger in any arc's exploration zones. They appear periodically while the player is in an explore-type zone. Format is the same as quests but `type: 'event'`.

---

## Adding a New Arc

> Arcs are more involved but follow the same pattern.

1. **Add arc data** to the `ARCS` array in `index.html` (name, colors, dialogue, victoryText)
2. **Add 4 zones** to `engine/world.js` ZONES (1 hub + 3 combat)
3. **Add zone metadata** to `data/zones.js`
4. **Add enemies** to `data/enemies.js` with arc index and spawnZones
5. **Add items** to `data/items.js` with the arc index
6. **Add quests** to `data/quests.js` with the arc index
7. **Increment arc count** in `ARCS.length` (automatic)

---

## Item Affix Reference

Affixes are rolled by the engine for Rare+ items. They are not defined per-item but pulled from a shared pool in `engine/progression.js`.

| Affix ID | Label | Effect |
|----------|-------|--------|
| `burning` | of Burning | Fire DOT: 3 DPS for 60 frames |
| `shocking` | of Shocking | Shock DOT: 2 DPS for 45 frames |
| `swift` | of Swiftness | +2 Agility |
| `fortified` | of Fortitude | +2 Endurance |
| `keen` | of Keen Edge | +2 Strength |
| `arcane` | of Arcana | +2 Intellect |
| `lucky` | Fortune's | +2 Luck |
| `phasing` | Phasing | Bullets pierce enemies |
| `explosive` | Explosive | 40px AoE, 5 dmg on hit |
| `lifesteal` | of Lifesteal | Heal 10% of damage dealt |

To add a new affix, edit the `AFFIX_POOL` array in `engine/progression.js`.

---

## Skill Reference

| Skill | Stat | DC Range | Typical Use |
|-------|------|----------|-------------|
| `breach` | Intellect | 10–16 | Terminal hacks, locked content |
| `persuade` | Intellect | 10–14 | NPC outcomes |
| `intimidate` | Strength | 10–14 | Force NPC compliance |
| `stealth` | Agility | 12–18 | Avoid patrols |
| `survive` | Endurance | 8–14 | Resist hazards |
| `scan` | Intellect | 8–14 | Hidden item reveal |
| `scavenge` | Luck | 10–14 | Find extra loot |
| `first_aid` | Endurance | 8–12 | Heal between fights |
