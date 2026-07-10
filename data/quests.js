// ═══════════════════════════════════════════════════════
// WSL SAGA MULTIVERSE — Quest Definitions
// Arc quests, side-quests, world events
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved
// ═══════════════════════════════════════════════════════

/**
 * Quest types:
 *   'main'    — Required to advance the arc
 *   'side'    — Optional, rewards XP/items
 *   'event'   — Triggered randomly in exploration zones
 *
 * Objective types:
 *   'kill'     — Kill N enemies of a given type
 *   'survive'  — Survive N waves
 *   'collect'  — Collect N pickups
 *   'reach'    — Travel to a specific zone
 *   'check'    — Pass a skill check (dice roll)
 *
 * check: { skill, dc, successEffect, failEffect }
 */
export const QUESTS = [

  // ─── ARC I MAIN ────────────────────────────────────────────────────
  {
    id: 'appleomia_main_1',
    arc: 0,
    type: 'main',
    title: 'Breach the Gatekeeper Wall',
    description: 'The Glass Citadel stands behind a wall of Gatekeeper Drones. Clear the approach.',
    objectives: [
      { type: 'kill', target: 'gatekeeper_drone', count: 10, label: 'Destroy Gatekeeper Drones' },
      { type: 'reach', zoneId: 'zone_gatekeeper_wall', label: 'Reach the Gatekeeper Wall' },
    ],
    reward: { xp: 100, item: 'gatekeeper_shard' },
  },
  {
    id: 'appleomia_main_2',
    arc: 0,
    type: 'main',
    title: 'Defeat the Architect',
    description: 'The Architect of Cupertino controls the inner sanctum. End this.',
    objectives: [
      { type: 'kill', target: 'architect_of_cupertino', count: 1, label: 'Defeat the Architect of Cupertino' },
    ],
    reward: { xp: 300, item: 'open_core_badge' },
    prerequisite: 'appleomia_main_1',
  },

  // ─── ARC I SIDE ────────────────────────────────────────────────────
  {
    id: 'appleomia_side_1',
    arc: 0,
    type: 'side',
    title: 'Salvage the Rebel Cache',
    description: 'A rebel data cache was left behind in the Glass Approach. Scavenge it.',
    objectives: [
      { type: 'check', skill: 'scavenge', dc: 12, label: 'Scavenge the rebel cache',
        successEffect: { item: 'citadel_fragment', xp: 50 },
        failEffect: { message: 'Cache was wiped clean. Nothing salvageable.' } },
    ],
    reward: { xp: 75 },
  },

  // ─── ARC II MAIN ───────────────────────────────────────────────────
  {
    id: 'slack_main_1',
    arc: 1,
    type: 'main',
    title: 'Silence the Notification Flood',
    description: 'SLCK-9\'s signals are overwhelming every system. Destroy the source.',
    objectives: [
      { type: 'kill', target: 'notification_storm', count: 15, label: 'Destroy Notification Storms' },
      { type: 'reach', zoneId: 'zone_channel_breach', label: 'Enter the Channel Breach' },
    ],
    reward: { xp: 120, item: 'channel_key' },
  },
  {
    id: 'slack_main_2',
    arc: 1,
    type: 'main',
    title: 'Terminate SLCK-9',
    description: 'SLCK-9 has reached singularity. Its frequency must be collapsed.',
    objectives: [
      { type: 'kill', target: 'slck9', count: 1, label: 'Destroy SLCK-9' },
    ],
    reward: { xp: 300, item: 'notification_cannon' },
    prerequisite: 'slack_main_1',
  },

  // ─── ARC II SIDE ───────────────────────────────────────────────────
  {
    id: 'slack_side_1',
    arc: 1,
    type: 'side',
    title: 'Decrypt the Hidden Channel',
    description: 'There is a locked channel in the Notification Flood. Breach it.',
    objectives: [
      { type: 'check', skill: 'breach', dc: 14, label: 'Decrypt the hidden channel',
        successEffect: { xp: 100, item: 'signal_shielding' },
        failEffect: { damage: 15, message: 'Decryption failed. Security protocol triggered.' } },
    ],
    reward: { xp: 60 },
  },

  // ─── ARC III MAIN ──────────────────────────────────────────────────
  {
    id: 'echoes_main_1',
    arc: 2,
    type: 'main',
    title: 'Navigate the Dead Channels',
    description: 'The echo entities guard every passage. Break through.',
    objectives: [
      { type: 'kill', target: 'echo_entity', count: 12, label: 'Destroy Echo Entities' },
      { type: 'reach', zoneId: 'zone_recursion_field', label: 'Enter the Recursion Field' },
    ],
    reward: { xp: 130, item: 'echo_lance' },
  },
  {
    id: 'echoes_main_2',
    arc: 2,
    type: 'main',
    title: 'Silence Daemon-7',
    description: 'Daemon-7 guards the exit from the Echo Lattice. Destroy it.',
    objectives: [
      { type: 'kill', target: 'daemon7', count: 1, label: 'Destroy Daemon-7' },
    ],
    reward: { xp: 300, item: 'dead_packet_relic' },
    prerequisite: 'echoes_main_1',
  },

  // ─── ARC III SIDE ──────────────────────────────────────────────────
  {
    id: 'echoes_side_1',
    arc: 2,
    type: 'side',
    title: 'Commune with the Echo',
    description: 'A lingering echo entity seems peaceful. Try to communicate.',
    objectives: [
      { type: 'check', skill: 'persuade', dc: 13, label: 'Communicate with the Echo Entity',
        successEffect: { xp: 80, item: 'lattice_armor' },
        failEffect: { message: 'The echo entity turns hostile. It doesn\'t understand you.' } },
    ],
    reward: { xp: 50 },
  },

  // ─── ARC IV MAIN ───────────────────────────────────────────────────
  {
    id: 'arm_main_1',
    arc: 3,
    type: 'main',
    title: 'Hold the Wasteland Front',
    description: 'ARM soldiers advance in formation. Break their line.',
    objectives: [
      { type: 'kill', target: 'arm_soldier', count: 15, label: 'Defeat ARM Soldiers' },
      { type: 'survive', waves: 2, label: 'Survive 2 waves at the front' },
    ],
    reward: { xp: 140, item: 'risc_blade' },
  },
  {
    id: 'arm_main_2',
    arc: 3,
    type: 'main',
    title: 'Destroy the Dominion',
    description: 'The ARM Dominion\'s core processor is the final target.',
    objectives: [
      { type: 'kill', target: 'arm_dominion', count: 1, label: 'Destroy the ARM Dominion' },
    ],
    reward: { xp: 350, item: 'silicon_plating' },
    prerequisite: 'arm_main_1',
  },

  // ─── ARC IV SIDE ───────────────────────────────────────────────────
  {
    id: 'arm_side_1',
    arc: 3,
    type: 'side',
    title: 'Intimidate the Defector',
    description: 'A RISC-V defector may have intel. Make them talk.',
    objectives: [
      { type: 'check', skill: 'intimidate', dc: 12, label: 'Intimidate the defector',
        successEffect: { xp: 90, buff: { stat: 'strength', value: 1, permanent: true } },
        failEffect: { message: 'The defector refuses to speak. A dead end.' } },
    ],
    reward: { xp: 70 },
  },

  // ─── ARC V MAIN ────────────────────────────────────────────────────
  {
    id: 'ledger_main_1',
    arc: 4,
    type: 'main',
    title: 'Enter the Causality Rift',
    description: 'The Ledger\'s guardians protect every approach. Clear the path.',
    objectives: [
      { type: 'kill', target: 'ledger_guardian', count: 15, label: 'Destroy Ledger Guardians' },
      { type: 'reach', zoneId: 'zone_causality_rift', label: 'Enter the Causality Rift' },
    ],
    reward: { xp: 160, item: 'causality_gun' },
  },
  {
    id: 'ledger_main_2',
    arc: 4,
    type: 'main',
    title: 'Claim the Ledger',
    description: 'The Ledger itself is the final adversary. Prove your worth.',
    objectives: [
      { type: 'kill', target: 'the_ledger', count: 1, label: 'Defeat The Ledger Itself' },
    ],
    reward: { xp: 500, item: 'ledger_page' },
    prerequisite: 'ledger_main_1',
  },

  // ─── RANDOM EXPLORATION EVENTS (arc -1 = any arc) ─────────────────
  {
    id: 'event_medkit_cache',
    arc: -1,
    type: 'event',
    title: 'Abandoned Medkit Cache',
    description: 'You find a damaged cache. A careful scan might reveal something useful.',
    objectives: [
      { type: 'check', skill: 'scan', dc: 10, label: 'Scan the cache',
        successEffect: { item: 'medpack_advanced', xp: 30 },
        failEffect: { item: 'medpack_basic', xp: 10 } },
    ],
    reward: {},
  },
  {
    id: 'event_data_stream',
    arc: -1,
    type: 'event',
    title: 'Unstable Data Stream',
    description: 'A raw data stream flows through the area. Breach it for intel.',
    objectives: [
      { type: 'check', skill: 'breach', dc: 11, label: 'Breach the data stream',
        successEffect: { xp: 75 },
        failEffect: { damage: 10, message: 'The stream surges. You take damage.' } },
    ],
    reward: {},
  },
  {
    id: 'event_hostile_npc',
    arc: -1,
    type: 'event',
    title: 'Hostile Survivor',
    description: 'A cornered survivor threatens to attack. You might talk them down.',
    objectives: [
      { type: 'check', skill: 'persuade', dc: 12, label: 'Persuade the survivor',
        successEffect: { item: 'overclock_chip', xp: 40, message: 'They stand down and offer you a chip.' },
        failEffect: { waves: 1, message: 'They attack. You must defend yourself.' } },
    ],
    reward: {},
  },
];

/** Get main quests for an arc */
export function getMainQuests(arcIndex) {
  return QUESTS.filter(q => q.arc === arcIndex && q.type === 'main');
}

/** Get side quests for an arc */
export function getSideQuests(arcIndex) {
  return QUESTS.filter(q => q.arc === arcIndex && q.type === 'side');
}

/** Get a random exploration event (optionally filtered by arc) */
export function getRandomEvent(arcIndex = -1) {
  const pool = QUESTS.filter(q => q.type === 'event' && (q.arc === -1 || q.arc === arcIndex));
  if (!pool.length) return null;
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Get quest by id */
export function getQuest(id) {
  return QUESTS.find(q => q.id === id) || null;
}
