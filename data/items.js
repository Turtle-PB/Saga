// ═══════════════════════════════════════════════════════
// WSL SAGA MULTIVERSE — Item Definitions
// Weapons, armor, consumables for all arcs
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved
// ═══════════════════════════════════════════════════════

/**
 * Item types: 'weapon' | 'armor' | 'consumable' | 'relic'
 * arc: -1 = generic (drops in any arc), 0-4 = arc-specific
 *
 * baseStats keys: strength | agility | intellect | endurance | luck
 * Weapon items also have: damage (base bullet damage), fireRate, bulletSpeed
 * Armor items also have: defense (damage reduction flat)
 */
export const ITEMS = [
  // ─── GENERIC CONSUMABLES ───────────────────────────────
  {
    id: 'medpack_basic',
    name: 'Basic Medpack',
    type: 'consumable',
    arc: -1,
    description: 'Restores 30 HP.',
    baseStats: {},
    use: { heal: 30 },
  },
  {
    id: 'medpack_advanced',
    name: 'Advanced Medpack',
    type: 'consumable',
    arc: -1,
    description: 'Restores 60 HP and clears one status effect.',
    baseStats: {},
    use: { heal: 60, clearStatus: 1 },
  },
  {
    id: 'data_fragment',
    name: 'Data Fragment',
    type: 'consumable',
    arc: -1,
    description: 'A compressed data node. Grants 50 XP.',
    baseStats: {},
    use: { xp: 50 },
  },
  {
    id: 'overclock_chip',
    name: 'Overclock Chip',
    type: 'consumable',
    arc: -1,
    description: 'Increases fire rate by 50% for 10 seconds.',
    baseStats: {},
    use: { buff: { stat: 'fireRate', mult: 0.5, duration: 600 } },
  },

  // ─── GENERIC WEAPONS ───────────────────────────────────
  {
    id: 'pulse_pistol',
    name: 'Pulse Pistol',
    type: 'weapon',
    arc: -1,
    description: 'A reliable sidearm. Moderate fire rate.',
    baseStats: { strength: 1 },
    damage: 8, fireRate: 12, bulletSpeed: 420,
  },
  {
    id: 'rapid_caster',
    name: 'Rapid Caster',
    type: 'weapon',
    arc: -1,
    description: 'High fire rate but lower damage per shot.',
    baseStats: { agility: 1 },
    damage: 5, fireRate: 7, bulletSpeed: 380,
  },
  {
    id: 'heavy_railgun',
    name: 'Heavy Railgun',
    type: 'weapon',
    arc: -1,
    description: 'Slow but powerful. Pierces through enemies.',
    baseStats: { strength: 2 },
    damage: 18, fireRate: 30, bulletSpeed: 600,
    pierce: true,
  },

  // ─── GENERIC ARMOR ─────────────────────────────────────
  {
    id: 'light_shell',
    name: 'Light Shell',
    type: 'armor',
    arc: -1,
    description: 'Lightweight protection. Small HP bonus.',
    baseStats: { endurance: 1 },
    defense: 1,
  },
  {
    id: 'heavy_carapace',
    name: 'Heavy Carapace',
    type: 'armor',
    arc: -1,
    description: 'Strong protection. Slight movement penalty.',
    baseStats: { endurance: 3, agility: -1 },
    defense: 3,
  },
  {
    id: 'reflex_weave',
    name: 'Reflex Weave',
    type: 'armor',
    arc: -1,
    description: 'Improves dash cooldown and crit chance.',
    baseStats: { agility: 2, luck: 1 },
    defense: 1,
  },

  // ─── ARC I — APPLEOMIA ─────────────────────────────────
  {
    id: 'gatekeeper_shard',
    name: 'Gatekeeper Shard',
    type: 'weapon',
    arc: 0,
    description: 'Crystalline data weapon salvaged from a Gatekeeper Drone.',
    baseStats: { strength: 1, intellect: 1 },
    damage: 10, fireRate: 10, bulletSpeed: 440,
  },
  {
    id: 'open_core_badge',
    name: 'Open Core Badge',
    type: 'relic',
    arc: 0,
    description: 'A symbol of the rebellion. Skill check bonus +2.',
    baseStats: { intellect: 2, luck: 1 },
    skillBonus: 2,
  },
  {
    id: 'citadel_fragment',
    name: 'Citadel Fragment',
    type: 'armor',
    arc: 0,
    description: 'A shard of the Glass Citadel. Solid protection.',
    baseStats: { endurance: 2 },
    defense: 2,
  },

  // ─── ARC II — SLACK ROGUE ──────────────────────────────
  {
    id: 'notification_cannon',
    name: 'Notification Cannon',
    type: 'weapon',
    arc: 1,
    description: 'Fires rapid bursts like cascading notifications.',
    baseStats: { agility: 2 },
    damage: 6, fireRate: 6, bulletSpeed: 360,
  },
  {
    id: 'channel_key',
    name: 'Channel Key',
    type: 'relic',
    arc: 1,
    description: 'Unlocks hidden Slack channels. Persuade +3.',
    baseStats: { intellect: 1, luck: 2 },
    skillBonus: 3,
  },
  {
    id: 'signal_shielding',
    name: 'Signal Shielding',
    type: 'armor',
    arc: 1,
    description: 'Blocks incoming notification storms.',
    baseStats: { endurance: 1, intellect: 1 },
    defense: 2,
  },

  // ─── ARC III — PROTOCOL OF ECHOES ─────────────────────
  {
    id: 'echo_lance',
    name: 'Echo Lance',
    type: 'weapon',
    arc: 2,
    description: 'Fires ghost-data projectiles that echo on impact.',
    baseStats: { intellect: 2 },
    damage: 12, fireRate: 15, bulletSpeed: 480,
    echo: true,
  },
  {
    id: 'dead_packet_relic',
    name: 'Dead Packet Relic',
    type: 'relic',
    arc: 2,
    description: 'Carries the last transmission of a dead civilization.',
    baseStats: { intellect: 3 },
    skillBonus: 2,
  },
  {
    id: 'lattice_armor',
    name: 'Lattice Armor',
    type: 'armor',
    arc: 2,
    description: 'Woven from echo lattice data. Lightweight and protective.',
    baseStats: { endurance: 2, agility: 1 },
    defense: 2,
  },

  // ─── ARC IV — ARM WARS ─────────────────────────────────
  {
    id: 'risc_blade',
    name: 'RISC-V Blade',
    type: 'weapon',
    arc: 3,
    description: 'Precision-engineered open-hardware weapon.',
    baseStats: { strength: 3 },
    damage: 15, fireRate: 18, bulletSpeed: 520,
  },
  {
    id: 'dominion_core',
    name: 'Dominion Core',
    type: 'relic',
    arc: 3,
    description: 'A salvaged ARM processor core. Boosts endurance.',
    baseStats: { endurance: 3, strength: 1 },
    defense: 1,
  },
  {
    id: 'silicon_plating',
    name: 'Silicon Plating',
    type: 'armor',
    arc: 3,
    description: 'Dense silicon-wafer armor from the wastelands.',
    baseStats: { endurance: 3, agility: -1 },
    defense: 4,
  },

  // ─── ARC V — ARCHITECT'S LEDGER ───────────────────────
  {
    id: 'causality_gun',
    name: 'Causality Gun',
    type: 'weapon',
    arc: 4,
    description: 'A weapon that rewrites the laws of physics on impact.',
    baseStats: { strength: 2, intellect: 2, luck: 1 },
    damage: 20, fireRate: 14, bulletSpeed: 560,
  },
  {
    id: 'ledger_page',
    name: 'Torn Ledger Page',
    type: 'relic',
    arc: 4,
    description: 'A page that rewrites itself. All skill checks +2.',
    baseStats: { intellect: 3, luck: 2 },
    skillBonus: 4,
  },
  {
    id: 'convergence_shell',
    name: 'Convergence Shell',
    type: 'armor',
    arc: 4,
    description: 'The ultimate armor — forged at the convergence of all arcs.',
    baseStats: { endurance: 4, agility: 1 },
    defense: 5,
  },
];
