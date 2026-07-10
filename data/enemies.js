// ═══════════════════════════════════════════════════════
// WSL SAGA MULTIVERSE — Enemy Definitions
// Archetypes and spawn tables by arc/zone
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved
// ═══════════════════════════════════════════════════════

/**
 * Enemy archetypes:
 *   tier: 'minion' | 'soldier' | 'elite' | 'boss'
 *   role: 'chaser' | 'sniper' | 'swarmer' | 'shielder' | 'bomber' | 'boss'
 *
 * Behavior notes:
 *   chaser  — moves straight toward player, contact damage
 *   sniper  — keeps distance, fires accurate projectiles
 *   swarmer — fast, low HP, swarms in groups
 *   shielder — slow, high HP, rotates between player and cover
 *   bomber  — charges at player then "detonates" in AoE
 *   boss    — unique per arc, orbiting + spread fire patterns
 */
export const ENEMIES = [

  // ─── ARC I — APPLEOMIA ─────────────────────────────────────────────
  {
    id: 'gatekeeper_drone',
    arc: 0,
    name: 'Gatekeeper Drone',
    tier: 'minion',
    role: 'chaser',
    r: 12,
    health: 3,
    speed: 1.2,
    fireRate: 150,
    bulletSpeed: 200,
    damage: 5,
    color: '#ffffff',
    xp: 10,
    spawnZones: ['zone_glass_approach', 'zone_gatekeeper_wall'],
  },
  {
    id: 'sentinel_protocol',
    arc: 0,
    name: 'Sentinel Protocol',
    tier: 'soldier',
    role: 'sniper',
    r: 14,
    health: 6,
    speed: 0.8,
    fireRate: 80,
    bulletSpeed: 280,
    damage: 8,
    color: '#aaffaa',
    xp: 25,
    spawnZones: ['zone_gatekeeper_wall', 'zone_inner_sanctum'],
  },
  {
    id: 'warden_elite',
    arc: 0,
    name: 'Warden Elite',
    tier: 'elite',
    role: 'shielder',
    r: 18,
    health: 15,
    speed: 0.6,
    fireRate: 60,
    bulletSpeed: 240,
    damage: 10,
    color: '#88ffff',
    xp: 60,
    spawnZones: ['zone_inner_sanctum'],
  },
  {
    id: 'architect_of_cupertino',
    arc: 0,
    name: 'THE ARCHITECT OF CUPERTINO',
    tier: 'boss',
    role: 'boss',
    r: 50,
    health: 50,
    speed: 1.0,
    fireRate: 40,
    bulletSpeed: 250,
    damage: 15,
    color: '#aaffaa',
    xp: 200,
    spawnZones: ['zone_inner_sanctum'],
  },

  // ─── ARC II — SLACK ROGUE ───────────────────────────────────────────
  {
    id: 'notification_storm',
    arc: 1,
    name: 'Notification Storm',
    tier: 'minion',
    role: 'swarmer',
    r: 10,
    health: 2,
    speed: 1.8,
    fireRate: 200,
    bulletSpeed: 180,
    damage: 4,
    color: '#ff4444',
    xp: 10,
    spawnZones: ['zone_notification_flood', 'zone_channel_breach'],
  },
  {
    id: 'channel_disruptor',
    arc: 1,
    name: 'Channel Disruptor',
    tier: 'soldier',
    role: 'sniper',
    r: 13,
    health: 5,
    speed: 0.9,
    fireRate: 70,
    bulletSpeed: 300,
    damage: 7,
    color: '#ff8844',
    xp: 25,
    spawnZones: ['zone_channel_breach', 'zone_slck9_core'],
  },
  {
    id: 'overload_drone',
    arc: 1,
    name: 'Overload Drone',
    tier: 'elite',
    role: 'bomber',
    r: 16,
    health: 12,
    speed: 1.4,
    fireRate: 999,
    bulletSpeed: 0,
    damage: 20,
    color: '#ffcc00',
    xp: 60,
    spawnZones: ['zone_slck9_core'],
  },
  {
    id: 'slck9',
    arc: 1,
    name: 'SLCK-9',
    tier: 'boss',
    role: 'boss',
    r: 50,
    health: 50,
    speed: 1.0,
    fireRate: 40,
    bulletSpeed: 250,
    damage: 15,
    color: '#ff0000',
    xp: 200,
    spawnZones: ['zone_slck9_core'],
  },

  // ─── ARC III — PROTOCOL OF ECHOES ──────────────────────────────────
  {
    id: 'echo_entity',
    arc: 2,
    name: 'Echo Entity',
    tier: 'minion',
    role: 'chaser',
    r: 12,
    health: 3,
    speed: 1.3,
    fireRate: 130,
    bulletSpeed: 210,
    damage: 5,
    color: '#88ffcc',
    xp: 10,
    spawnZones: ['zone_dead_channels', 'zone_recursion_field'],
  },
  {
    id: 'phantom_process',
    arc: 2,
    name: 'Phantom Process',
    tier: 'soldier',
    role: 'sniper',
    r: 13,
    health: 5,
    speed: 0.7,
    fireRate: 90,
    bulletSpeed: 270,
    damage: 8,
    color: '#44ffaa',
    xp: 25,
    spawnZones: ['zone_recursion_field', 'zone_daemon7_core'],
  },
  {
    id: 'recursion_elite',
    arc: 2,
    name: 'Recursion Elite',
    tier: 'elite',
    role: 'shielder',
    r: 17,
    health: 14,
    speed: 0.5,
    fireRate: 55,
    bulletSpeed: 230,
    damage: 10,
    color: '#00ddff',
    xp: 60,
    spawnZones: ['zone_daemon7_core'],
  },
  {
    id: 'daemon7',
    arc: 2,
    name: 'DAEMON-7',
    tier: 'boss',
    role: 'boss',
    r: 50,
    health: 50,
    speed: 1.0,
    fireRate: 40,
    bulletSpeed: 250,
    damage: 15,
    color: '#00ffaa',
    xp: 200,
    spawnZones: ['zone_daemon7_core'],
  },

  // ─── ARC IV — ARM WARS ─────────────────────────────────────────────
  {
    id: 'arm_soldier',
    arc: 3,
    name: 'ARM Soldier',
    tier: 'minion',
    role: 'chaser',
    r: 13,
    health: 4,
    speed: 1.1,
    fireRate: 120,
    bulletSpeed: 220,
    damage: 6,
    color: '#ffaa44',
    xp: 10,
    spawnZones: ['zone_wasteland_front', 'zone_dominion_march'],
  },
  {
    id: 'risc_defector',
    arc: 3,
    name: 'RISC-V Defector',
    tier: 'soldier',
    role: 'sniper',
    r: 14,
    health: 7,
    speed: 0.9,
    fireRate: 75,
    bulletSpeed: 290,
    damage: 9,
    color: '#ff6600',
    xp: 25,
    spawnZones: ['zone_dominion_march', 'zone_arm_processor'],
  },
  {
    id: 'siege_unit',
    arc: 3,
    name: 'Siege Unit',
    tier: 'elite',
    role: 'bomber',
    r: 20,
    health: 18,
    speed: 0.5,
    fireRate: 45,
    bulletSpeed: 200,
    damage: 15,
    color: '#ffdd00',
    xp: 60,
    spawnZones: ['zone_arm_processor'],
  },
  {
    id: 'arm_dominion',
    arc: 3,
    name: 'THE ARM DOMINION',
    tier: 'boss',
    role: 'boss',
    r: 50,
    health: 50,
    speed: 1.0,
    fireRate: 40,
    bulletSpeed: 250,
    damage: 15,
    color: '#ff8800',
    xp: 200,
    spawnZones: ['zone_arm_processor'],
  },

  // ─── ARC V — ARCHITECT'S LEDGER ────────────────────────────────────
  {
    id: 'ledger_guardian',
    arc: 4,
    name: 'Ledger Guardian',
    tier: 'minion',
    role: 'chaser',
    r: 12,
    health: 4,
    speed: 1.2,
    fireRate: 110,
    bulletSpeed: 230,
    damage: 6,
    color: '#ffdd44',
    xp: 10,
    spawnZones: ['zone_rewritten_laws', 'zone_causality_rift'],
  },
  {
    id: 'causality_wraith',
    arc: 4,
    name: 'Causality Wraith',
    tier: 'soldier',
    role: 'sniper',
    r: 14,
    health: 6,
    speed: 0.85,
    fireRate: 65,
    bulletSpeed: 310,
    damage: 10,
    color: '#ffd700',
    xp: 25,
    spawnZones: ['zone_causality_rift', 'zone_ledger_sanctum'],
  },
  {
    id: 'rewriter_elite',
    arc: 4,
    name: 'Rewriter Elite',
    tier: 'elite',
    role: 'shielder',
    r: 18,
    health: 16,
    speed: 0.6,
    fireRate: 50,
    bulletSpeed: 260,
    damage: 12,
    color: '#fff700',
    xp: 60,
    spawnZones: ['zone_ledger_sanctum'],
  },
  {
    id: 'the_ledger',
    arc: 4,
    name: 'THE LEDGER ITSELF',
    tier: 'boss',
    role: 'boss',
    r: 50,
    health: 50,
    speed: 1.0,
    fireRate: 40,
    bulletSpeed: 250,
    damage: 15,
    color: '#ffd700',
    xp: 200,
    spawnZones: ['zone_ledger_sanctum'],
  },
];

/** Get enemies that spawn in a given zone */
export function getEnemiesForZone(zoneId) {
  return ENEMIES.filter(e => e.spawnZones.includes(zoneId));
}

/** Get the boss enemy for an arc */
export function getBossForArc(arcIndex) {
  return ENEMIES.find(e => e.arc === arcIndex && e.tier === 'boss');
}

/** Build an enemy spawn table for a zone (returns array of ids to spawn) */
export function buildSpawnTable(zoneId, waveNumber = 1, arcIndex = 0) {
  const pool = getEnemiesForZone(zoneId).filter(e => e.tier !== 'boss');
  if (!pool.length) return [];

  const count = 5 + waveNumber * 2;
  const table = [];

  // Add weights: higher tier enemies more likely at higher waves
  for (let i = 0; i < count; i++) {
    const rand = Math.random();
    let tier;
    if (waveNumber >= 3 && rand < 0.15) tier = 'elite';
    else if (rand < 0.35) tier = 'soldier';
    else tier = 'minion';

    const candidates = pool.filter(e => e.tier === tier);
    const source = candidates.length ? candidates : pool;
    table.push(source[Math.floor(Math.random() * source.length)]);
  }

  return table;
}
