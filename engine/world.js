// ═══════════════════════════════════════════════════════
// WSL SAGA MULTIVERSE — World State Manager
// Zone framework, quest hooks, world-state flags
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved
// ═══════════════════════════════════════════════════════

/**
 * Zone types
 * - 'hub'     : Safe town/camp. NPCs present. No enemies.
 * - 'explore' : Open world area. Roaming encounters. Low density.
 * - 'danger'  : High-density enemy area. Boss may spawn.
 */
export const ZONE_TYPES = { HUB: 'hub', EXPLORE: 'explore', DANGER: 'danger' };

/**
 * Master zone map — one hub + 3 zones per arc.
 * Each zone references an arc (0-4) and links to connected zones.
 */
export const ZONES = [
  // Arc I — Appleomia
  { id: 'hub_appleomia',     arc: 0, type: 'hub',     name: 'Open Core Camp',      connects: ['zone_glass_approach'] },
  { id: 'zone_glass_approach',arc:0, type: 'explore', name: 'Glass Approach',      connects: ['hub_appleomia','zone_gatekeeper_wall'] },
  { id: 'zone_gatekeeper_wall',arc:0,type: 'danger',  name: 'Gatekeeper Wall',     connects: ['zone_glass_approach','zone_inner_sanctum'] },
  { id: 'zone_inner_sanctum', arc: 0, type: 'danger', name: 'Inner Sanctum',       connects: ['zone_gatekeeper_wall','hub_slack_node'], boss: true },

  // Arc II — Slack Rogue
  { id: 'hub_slack_node',    arc: 1, type: 'hub',     name: 'Signal Relay Hub',    connects: ['zone_notification_flood'] },
  { id: 'zone_notification_flood',arc:1,type:'explore',name:'Notification Flood',  connects: ['hub_slack_node','zone_channel_breach'] },
  { id: 'zone_channel_breach',arc:1, type: 'danger',  name: 'Channel Breach',      connects: ['zone_notification_flood','zone_slck9_core'] },
  { id: 'zone_slck9_core',   arc: 1, type: 'danger',  name: 'SLCK-9 Core',         connects: ['zone_channel_breach','hub_echo_lattice'], boss: true },

  // Arc III — Protocol of Echoes
  { id: 'hub_echo_lattice',  arc: 2, type: 'hub',     name: 'Echo Lattice Node',   connects: ['zone_dead_channels'] },
  { id: 'zone_dead_channels',arc: 2, type: 'explore', name: 'Dead Channels',       connects: ['hub_echo_lattice','zone_recursion_field'] },
  { id: 'zone_recursion_field',arc:2,type: 'danger',  name: 'Recursion Field',     connects: ['zone_dead_channels','zone_daemon7_core'] },
  { id: 'zone_daemon7_core', arc: 2, type: 'danger',  name: 'Daemon-7 Nexus',      connects: ['zone_recursion_field','hub_silicon_ruins'], boss: true },

  // Arc IV — ARM Wars
  { id: 'hub_silicon_ruins', arc: 3, type: 'hub',     name: 'RISC-V Stronghold',   connects: ['zone_wasteland_front'] },
  { id: 'zone_wasteland_front',arc:3,type: 'explore', name: 'Wasteland Front',     connects: ['hub_silicon_ruins','zone_dominion_march'] },
  { id: 'zone_dominion_march',arc:3,type: 'danger',   name: 'Dominion March',      connects: ['zone_wasteland_front','zone_arm_processor'] },
  { id: 'zone_arm_processor', arc: 3, type: 'danger', name: 'ARM Processor Core',  connects: ['zone_dominion_march','hub_ledger_approach'], boss: true },

  // Arc V — Architect's Ledger
  { id: 'hub_ledger_approach',arc:4,type: 'hub',      name: 'Convergence Point',   connects: ['zone_rewritten_laws'] },
  { id: 'zone_rewritten_laws',arc:4,type: 'explore',  name: 'Rewritten Laws',      connects: ['hub_ledger_approach','zone_causality_rift'] },
  { id: 'zone_causality_rift',arc:4,type: 'danger',   name: 'Causality Rift',      connects: ['zone_rewritten_laws','zone_ledger_sanctum'] },
  { id: 'zone_ledger_sanctum',arc:4,type: 'danger',   name: 'Ledger Sanctum',      connects: ['zone_causality_rift'], boss: true },
];

/** Create the initial world state */
export function createWorldState() {
  return {
    currentZoneId: 'hub_appleomia',
    visitedZones: new Set(['hub_appleomia']),
    clearedZones: new Set(),
    flags: {},          // arbitrary world-state flags
    questStates: {},    // questId -> 'active'|'complete'|'failed'
    npcStates: {},      // npcId -> { talked: bool, relation: number }
  };
}

/** Get zone object by id */
export function getZone(id) {
  return ZONES.find(z => z.id === id) || ZONES[0];
}

/** Get all zones for a given arc */
export function getZonesForArc(arcIndex) {
  return ZONES.filter(z => z.arc === arcIndex);
}

/** Get the hub zone for a given arc */
export function getHubForArc(arcIndex) {
  return ZONES.find(z => z.arc === arcIndex && z.type === 'hub');
}

/** Move to a zone (returns false if not connected) */
export function travelTo(worldState, zoneId) {
  const current = getZone(worldState.currentZoneId);
  if (!current.connects.includes(zoneId)) return false;
  worldState.currentZoneId = zoneId;
  worldState.visitedZones.add(zoneId);
  return true;
}

/** Mark a zone as cleared (boss defeated) */
export function clearZone(worldState, zoneId) {
  worldState.clearedZones.add(zoneId);
}

/** Set a world flag */
export function setFlag(worldState, key, value = true) {
  worldState.flags[key] = value;
}

/** Check a world flag */
export function getFlag(worldState, key) {
  return worldState.flags[key] || false;
}

/** Get display color for zone type */
export function zoneTypeColor(type) {
  switch (type) {
    case 'hub':     return '#00ff88';
    case 'explore': return '#88ccff';
    case 'danger':  return '#ff4444';
    default:        return '#ffffff';
  }
}
