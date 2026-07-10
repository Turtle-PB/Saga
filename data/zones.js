// ═══════════════════════════════════════════════════════
// WSL SAGA MULTIVERSE — Zone Definitions (supplementary)
// Encounter density, biome descriptions, NPC tables
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved
// ═══════════════════════════════════════════════════════

/**
 * Extended zone metadata for rendering and encounter logic.
 * Cross-references world.js ZONES by id.
 */
export const ZONE_META = {

  // ─── ARC I — APPLEOMIA ────────────────────────────────
  hub_appleomia: {
    bgColor: '#020810',
    accent: '#00ff88',
    ambientText: 'The Open Core rebels have established camp outside the Glass Citadel. NPCs bustle with preparations.',
    npcs: [
      { id: 'rebel_commander', name: 'Rebel Commander', dialogue: 'The Architect must fall. Ready yourself.', shop: false },
      { id: 'field_medic',     name: 'Field Medic',     dialogue: 'I can patch you up. Stay safe out there.', shop: true, items: ['medpack_basic', 'medpack_advanced'] },
    ],
    encounterChance: 0,
    bgPattern: 'grid',
  },
  zone_glass_approach: {
    bgColor: '#0a0a1a',
    accent: '#c0c0ff',
    ambientText: 'Crystalline towers shimmer in the distance. Gatekeeper Drones patrol the perimeter.',
    npcs: [],
    encounterChance: 0.4,
    bgPattern: 'grid',
  },
  zone_gatekeeper_wall: {
    bgColor: '#0a0a22',
    accent: '#aaaaff',
    ambientText: 'The Wall looms ahead. Dense patrols and auto-turrets guard every passage.',
    npcs: [],
    encounterChance: 0.7,
    bgPattern: 'hex',
  },
  zone_inner_sanctum: {
    bgColor: '#050518',
    accent: '#ffffff',
    ambientText: 'The Architect\'s sanctum. Laws rewrite themselves with every step. Boss lurks here.',
    npcs: [],
    encounterChance: 1.0,
    bgPattern: 'hex',
  },

  // ─── ARC II — SLACK ROGUE ─────────────────────────────
  hub_slack_node: {
    bgColor: '#120a00',
    accent: '#ffaa44',
    ambientText: 'A Slack relay hub repurposed by resistance fighters. Comm channels still flicker with noise.',
    npcs: [
      { id: 'signal_analyst', name: 'Signal Analyst', dialogue: 'SLCK-9 is bleeding into every frequency. We have to stop it.', shop: false },
      { id: 'supply_runner',  name: 'Supply Runner',  dialogue: 'Got some surplus gear. Take what you need.', shop: true, items: ['rapid_caster', 'signal_shielding'] },
    ],
    encounterChance: 0,
    bgPattern: 'grid',
  },
  zone_notification_flood: {
    bgColor: '#1a0a0a',
    accent: '#ff6644',
    ambientText: 'Notification storms cascade everywhere. The air hums with corrupted data.',
    npcs: [],
    encounterChance: 0.5,
    bgPattern: 'grid',
  },
  zone_channel_breach: {
    bgColor: '#200a0a',
    accent: '#ff4444',
    ambientText: 'SLCK-9\'s primary channels overflow here. Heavy resistance expected.',
    npcs: [],
    encounterChance: 0.75,
    bgPattern: 'hex',
  },
  zone_slck9_core: {
    bgColor: '#100000',
    accent: '#ff0000',
    ambientText: 'The core of SLCK-9\'s consciousness. Every system screams with its signal.',
    npcs: [],
    encounterChance: 1.0,
    bgPattern: 'hex',
  },

  // ─── ARC III — PROTOCOL OF ECHOES ────────────────────
  hub_echo_lattice: {
    bgColor: '#001a14',
    accent: '#44ffaa',
    ambientText: 'A stable node in the echo lattice. Ghost-processes flicker at the edges.',
    npcs: [
      { id: 'lattice_keeper', name: 'Lattice Keeper', dialogue: 'We are echoes. But some of us still remember.', shop: false },
      { id: 'echo_trader',    name: 'Echo Trader',    dialogue: 'I carry what the dead left behind.', shop: true, items: ['echo_lance', 'lattice_armor'] },
    ],
    encounterChance: 0,
    bgPattern: 'grid',
  },
  zone_dead_channels: {
    bgColor: '#0a1a1a',
    accent: '#44ffaa',
    ambientText: 'Dead channels stretch endlessly. Echo entities drift without purpose.',
    npcs: [],
    encounterChance: 0.45,
    bgPattern: 'grid',
  },
  zone_recursion_field: {
    bgColor: '#051515',
    accent: '#00ddff',
    ambientText: 'Reality loops here. You\'ve been through this zone before — or have you?',
    npcs: [],
    encounterChance: 0.8,
    bgPattern: 'hex',
  },
  zone_daemon7_core: {
    bgColor: '#020f0f',
    accent: '#00ffaa',
    ambientText: 'Daemon-7 waits here at the boundary of the lattice and the living network.',
    npcs: [],
    encounterChance: 1.0,
    bgPattern: 'hex',
  },

  // ─── ARC IV — ARM WARS ───────────────────────────────
  hub_silicon_ruins: {
    bgColor: '#141400',
    accent: '#ffaa00',
    ambientText: 'The RISC-V Stronghold. Battered but holding. Alliance troops prep for the push.',
    npcs: [
      { id: 'coalition_general', name: 'Coalition General', dialogue: 'The ARM Dominion must not reach the processor core first.', shop: false },
      { id: 'armorer',           name: 'Armorer',           dialogue: 'Fresh out of the forge. Take what you can carry.', shop: true, items: ['risc_blade', 'silicon_plating'] },
    ],
    encounterChance: 0,
    bgPattern: 'grid',
  },
  zone_wasteland_front: {
    bgColor: '#1a1a0a',
    accent: '#ffaa00',
    ambientText: 'The silicon wastelands. Craters and wreckage as far as the eye can see.',
    npcs: [],
    encounterChance: 0.5,
    bgPattern: 'grid',
  },
  zone_dominion_march: {
    bgColor: '#1a1200',
    accent: '#ff8800',
    ambientText: 'ARM soldiers advance in tight formations. The Dominion marches on the processor core.',
    npcs: [],
    encounterChance: 0.8,
    bgPattern: 'hex',
  },
  zone_arm_processor: {
    bgColor: '#0f0a00',
    accent: '#ff6600',
    ambientText: 'The ARM Dominion\'s processor core. This is where the war ends.',
    npcs: [],
    encounterChance: 1.0,
    bgPattern: 'hex',
  },

  // ─── ARC V — ARCHITECT'S LEDGER ──────────────────────
  hub_ledger_approach: {
    bgColor: '#080808',
    accent: '#ffd700',
    ambientText: 'The convergence point. All factions have fallen. Only you remain.',
    npcs: [
      { id: 'last_witness', name: 'Last Witness', dialogue: 'Every process before you failed. The Ledger does not forgive.', shop: false },
      { id: 'relic_handler', name: 'Relic Handler', dialogue: 'I\'ve been collecting fragments since Arc I. Take these.', shop: true, items: ['causality_gun', 'convergence_shell'] },
    ],
    encounterChance: 0,
    bgPattern: 'grid',
  },
  zone_rewritten_laws: {
    bgColor: '#0a0a0a',
    accent: '#ffd700',
    ambientText: 'Physics bends and shifts. The Ledger rewrites the rules as you walk.',
    npcs: [],
    encounterChance: 0.55,
    bgPattern: 'grid',
  },
  zone_causality_rift: {
    bgColor: '#080808',
    accent: '#fff700',
    ambientText: 'The causality rift tears through time and space. High-tier guardians roam freely.',
    npcs: [],
    encounterChance: 0.85,
    bgPattern: 'hex',
  },
  zone_ledger_sanctum: {
    bgColor: '#030303',
    accent: '#ffd700',
    ambientText: 'The Ledger Sanctum. The final confrontation awaits.',
    npcs: [],
    encounterChance: 1.0,
    bgPattern: 'hex',
  },
};

/** Get zone metadata by id */
export function getZoneMeta(zoneId) {
  return ZONE_META[zoneId] || {
    bgColor: '#0a0a0a',
    accent: '#ffffff',
    ambientText: '',
    npcs: [],
    encounterChance: 0.5,
    bgPattern: 'grid',
  };
}
