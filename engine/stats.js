// ═══════════════════════════════════════════════════════
// WSL SAGA MULTIVERSE — Character Stats Model
// RPG attributes, skills, and traits
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved
// ═══════════════════════════════════════════════════════

import { modifier } from './dice.js';

/** Base stat allocation at level 1 */
export const BASE_STATS = {
  strength: 10,   // Melee/bullet damage bonus
  agility: 10,    // Movement speed, dash cooldown reduction
  intellect: 10,  // Skill check bonus, ability power
  endurance: 10,  // Max health (+5 HP per point above 10)
  luck: 10,       // Loot quality, crit chance
};

/** Derived stats calculated from base stats */
export function deriveStats(stats, level = 1) {
  return {
    maxHealth: 100 + (stats.endurance - 10) * 5 + (level - 1) * 10,
    speed: 3.5 + modifier(stats.agility) * 0.2,
    dashCooldownMax: Math.max(30, 60 - modifier(stats.agility) * 5),
    critChance: Math.max(0.05, 0.05 + modifier(stats.luck) * 0.02),
    damageBonus: modifier(stats.strength),
    skillBonus: modifier(stats.intellect),
    luckMod: modifier(stats.luck),
  };
}

/** Available skills — each governed by a primary stat */
export const SKILLS = {
  breach:    { stat: 'intellect', label: 'Breach',    desc: 'Hack terminals, open sealed doors' },
  persuade:  { stat: 'intellect', label: 'Persuade',  desc: 'Talk NPCs into better outcomes' },
  intimidate:{ stat: 'strength',  label: 'Intimidate',desc: 'Force NPCs to back down or yield' },
  stealth:   { stat: 'agility',   label: 'Stealth',   desc: 'Avoid enemy detection' },
  survive:   { stat: 'endurance', label: 'Survive',   desc: 'Resist status effects, traps' },
  scan:      { stat: 'intellect', label: 'Scan',      desc: 'Reveal enemy weaknesses, hidden items' },
  scavenge:  { stat: 'luck',      label: 'Scavenge',  desc: 'Find extra loot in ruins' },
  first_aid: { stat: 'endurance', label: 'First Aid', desc: 'Restore HP between encounters' },
};

/** Player trait definitions — granted at specific levels */
export const TRAITS = [
  { level: 2,  id: 'quick_draw',   label: 'Quick Draw',    desc: 'Fire rate +20%',          stat: 'agility' },
  { level: 3,  id: 'iron_will',    label: 'Iron Will',     desc: 'Max HP +25',               stat: 'endurance' },
  { level: 4,  id: 'eagle_eye',    label: 'Eagle Eye',     desc: 'Bullet speed +30%',        stat: 'intellect' },
  { level: 5,  id: 'berserker',    label: 'Berserker',     desc: 'Damage +3 when HP < 30%',  stat: 'strength' },
  { level: 6,  id: 'ghost',        label: 'Ghost',         desc: 'Dash leaves afterimage decoy', stat: 'agility' },
  { level: 7,  id: 'salvager',     label: 'Salvager',      desc: 'Pickup drop rate +15%',    stat: 'luck' },
  { level: 8,  id: 'overclock',    label: 'Overclock',     desc: 'Speed +10% for 5s after kill', stat: 'intellect' },
  { level: 10, id: 'apex_process', label: 'Apex Process',  desc: 'All stats +2',             stat: null },
];

/**
 * Create a fresh character stats object.
 * @returns {{ stats: object, skills: object, traits: string[], level: number, xp: number, statPoints: number }}
 */
export function createCharacter() {
  return {
    stats: { ...BASE_STATS },
    skills: Object.fromEntries(Object.keys(SKILLS).map(k => [k, 1])),
    traits: [],
    level: 1,
    xp: 0,
    xpToNext: 100,
    statPoints: 0,
  };
}

/**
 * Add XP and handle leveling.
 * @param {object} character
 * @param {number} amount
 * @returns {{ leveled: boolean, newLevel: number, trait: object|null }}
 */
export function addXP(character, amount) {
  character.xp += amount;
  let leveled = false;
  let newLevel = character.level;
  let trait = null;

  while (character.xp >= character.xpToNext) {
    character.xp -= character.xpToNext;
    character.level++;
    character.statPoints += 3;
    character.xpToNext = Math.floor(100 * Math.pow(1.3, character.level - 1));
    leveled = true;
    newLevel = character.level;

    // Check for trait unlock
    const unlocked = TRAITS.find(t => t.level === character.level);
    if (unlocked && !character.traits.includes(unlocked.id)) {
      character.traits.push(unlocked.id);
      trait = unlocked;
    }
  }

  return { leveled, newLevel, trait };
}

/**
 * Apply a trait's passive effect to derived stats.
 * @param {string[]} traits
 * @param {object} derived
 * @param {object} character
 * @returns {object} modified derived stats
 */
export function applyTraits(traits, derived, character) {
  const d = { ...derived };
  if (traits.includes('quick_draw')) d.fireRateMult = (d.fireRateMult || 1) * 0.8;
  if (traits.includes('iron_will')) d.maxHealth += 25;
  if (traits.includes('eagle_eye')) d.bulletSpeedMult = (d.bulletSpeedMult || 1) * 1.3;
  if (traits.includes('salvager')) d.pickupDropBonus = (d.pickupDropBonus || 0) + 0.15;
  if (traits.includes('apex_process')) {
    d.maxHealth += 10;
    d.speed += 0.4;
    d.damageBonus += 2;
  }
  return d;
}
