// ═══════════════════════════════════════════════════════
// WSL SAGA MULTIVERSE — Progression System
// XP, leveling, loot drops, item stat generation
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved
// ═══════════════════════════════════════════════════════

import { rollRarity, roll, modifier } from './dice.js';
import { ITEMS } from '../data/items.js';

/** XP values by enemy tier */
export const XP_TABLE = {
  minion:  10,
  soldier: 25,
  elite:   60,
  boss:    200,
};

/** Rarity display data */
export const RARITY_DATA = {
  common:    { label: 'Common',    color: '#aaaaaa', glow: '#666666' },
  uncommon:  { label: 'Uncommon',  color: '#44dd44', glow: '#226622' },
  rare:      { label: 'Rare',      color: '#4488ff', glow: '#224488' },
  epic:      { label: 'Epic',      color: '#cc44ff', glow: '#661188' },
  legendary: { label: 'Legendary', color: '#ffd700', glow: '#886600' },
};

/**
 * Calculate XP reward for defeating an enemy.
 * @param {string} tier - 'minion'|'soldier'|'elite'|'boss'
 * @param {number} arcBonus - Arc index (0-4) adds a small multiplier
 * @returns {number}
 */
export function xpForKill(tier, arcBonus = 0) {
  const base = XP_TABLE[tier] || XP_TABLE.minion;
  return Math.floor(base * (1 + arcBonus * 0.15));
}

/**
 * Generate a loot item drop.
 * @param {number} luck - Player luck stat
 * @param {number} arcIndex - Current arc (affects item pool)
 * @param {string} enemyTier - Enemy tier for drop chance
 * @returns {object|null} Item object or null (no drop)
 */
export function generateDrop(luck, arcIndex, enemyTier = 'soldier') {
  // Base drop chance by tier
  const dropChance = {
    minion:  0.10,
    soldier: 0.25,
    elite:   0.60,
    boss:    1.00,
  }[enemyTier] || 0.20;

  const luckBonus = modifier(luck) * 0.05;
  if (Math.random() > dropChance + luckBonus) return null;

  // Filter items for current arc or generic
  const pool = ITEMS.filter(i => i.arc === arcIndex || i.arc === -1);
  if (!pool.length) return null;

  const template = pool[Math.floor(Math.random() * pool.length)];
  const rarity = rollRarity(luck);
  return buildItem(template, rarity, arcIndex);
}

/**
 * Build an item instance from a template + rarity.
 * @param {object} template - Base item from ITEMS
 * @param {string} rarity
 * @param {number} arcIndex
 * @returns {object}
 */
export function buildItem(template, rarity, arcIndex = 0) {
  const rarityMult = {
    common:    1.0,
    uncommon:  1.2,
    rare:      1.5,
    epic:      2.0,
    legendary: 3.0,
  }[rarity] || 1.0;

  // Scale base stats by rarity
  const statRolls = {};
  if (template.baseStats) {
    for (const [stat, base] of Object.entries(template.baseStats)) {
      const variance = roll(6) - 3; // -3..+3
      statRolls[stat] = Math.max(1, Math.round(base * rarityMult) + variance);
    }
  }

  // Add a random affix on rare+
  const affixes = [];
  if (rarity === 'rare' || rarity === 'epic' || rarity === 'legendary') {
    affixes.push(rollAffix(arcIndex));
  }
  if (rarity === 'epic' || rarity === 'legendary') {
    affixes.push(rollAffix(arcIndex));
  }
  if (rarity === 'legendary') {
    affixes.push(rollAffix(arcIndex));
  }

  return {
    id: `${template.id}_${Date.now()}`,
    templateId: template.id,
    name: buildName(template.name, rarity, affixes),
    type: template.type,
    rarity,
    stats: statRolls,
    affixes,
    arc: arcIndex,
    description: template.description || '',
  };
}

/** Affix pool */
const AFFIX_POOL = [
  { id: 'burning',    label: 'of Burning',   effect: { dot: { type: 'fire',  dps: 3, duration: 60 } } },
  { id: 'shocking',   label: 'of Shocking',  effect: { dot: { type: 'shock', dps: 2, duration: 45 } } },
  { id: 'swift',      label: 'of Swiftness', effect: { stat: 'agility',   value: 2 } },
  { id: 'fortified',  label: 'of Fortitude', effect: { stat: 'endurance', value: 2 } },
  { id: 'keen',       label: 'of Keen Edge', effect: { stat: 'strength',  value: 2 } },
  { id: 'arcane',     label: 'of Arcana',    effect: { stat: 'intellect', value: 2 } },
  { id: 'lucky',      label: "Fortune's",    effect: { stat: 'luck',      value: 2 } },
  { id: 'phasing',    label: 'Phasing',      effect: { pierce: true } },
  { id: 'explosive',  label: 'Explosive',    effect: { aoe: { radius: 40, damage: 5 } } },
  { id: 'lifesteal',  label: 'of Lifesteal', effect: { lifesteal: 0.1 } },
];

function rollAffix(arcIndex) {
  return AFFIX_POOL[Math.floor(Math.random() * AFFIX_POOL.length)];
}

function buildName(baseName, rarity, affixes) {
  if (affixes.length === 0) return baseName;
  if (affixes.length === 1) return `${baseName} ${affixes[0].label}`;
  return `${affixes[0].label} ${baseName} ${affixes[1].label}`;
}

/**
 * Apply an item's stats to a character stat block (returns new stats).
 * @param {object} baseStats
 * @param {object[]} equippedItems
 * @returns {object}
 */
export function statsWithEquipment(baseStats, equippedItems = []) {
  const result = { ...baseStats };
  for (const item of equippedItems) {
    if (!item) continue;
    for (const [stat, value] of Object.entries(item.stats || {})) {
      if (result[stat] !== undefined) result[stat] += value;
    }
    for (const affix of item.affixes || []) {
      if (affix.effect?.stat && result[affix.effect.stat] !== undefined) {
        result[affix.effect.stat] += affix.effect.value || 0;
      }
    }
  }
  return result;
}
