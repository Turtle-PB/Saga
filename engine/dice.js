// ═══════════════════════════════════════════════════════
// WSL SAGA MULTIVERSE — Dice Engine
// Tabletop-style check resolver (d20 + modifiers)
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved
// ═══════════════════════════════════════════════════════

/**
 * Roll an n-sided die.
 * @param {number} sides - Number of sides (default 20)
 * @returns {number} Result 1..sides
 */
export function roll(sides = 20) {
  return Math.floor(Math.random() * sides) + 1;
}

/**
 * Standard ability modifier from a stat value (D&D-style).
 * stat 10 = +0, 12 = +1, 8 = -1, etc.
 * @param {number} stat
 * @returns {number}
 */
export function modifier(stat) {
  return Math.floor((stat - 10) / 2);
}

/**
 * Perform a d20 skill check.
 * @param {number} stat  - Ability score (e.g. intellect 10 = +0)
 * @param {number} dc    - Difficulty Class (8=easy, 12=medium, 16=hard, 20=very hard)
 * @param {number} bonus - Extra bonus (proficiency, item, etc.)
 * @returns {{ roll: number, total: number, dc: number, success: boolean, critical: boolean, fumble: boolean }}
 */
export function d20Check(stat, dc, bonus = 0) {
  const rawRoll = roll(20);
  const mod = modifier(stat);
  const total = rawRoll + mod + bonus;
  return {
    roll: rawRoll,
    total,
    dc,
    success: total >= dc,
    critical: rawRoll === 20,
    fumble: rawRoll === 1,
  };
}

/**
 * Perform a contested check (attacker vs defender).
 * @param {number} attackStat
 * @param {number} defendStat
 * @returns {{ attackRoll: number, defendRoll: number, success: boolean }}
 */
export function contestedCheck(attackStat, defendStat) {
  const atk = roll(20) + modifier(attackStat);
  const def = roll(20) + modifier(defendStat);
  return { attackRoll: atk, defendRoll: def, success: atk > def };
}

/**
 * Roll for loot rarity based on luck stat.
 * Returns: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
 * @param {number} luck - Luck stat (default 10)
 * @returns {string}
 */
export function rollRarity(luck = 10) {
  const r = roll(100);
  const luckMod = modifier(luck);
  const adjusted = r + luckMod * 3;
  if (adjusted >= 98) return 'legendary';
  if (adjusted >= 88) return 'epic';
  if (adjusted >= 70) return 'rare';
  if (adjusted >= 45) return 'uncommon';
  return 'common';
}

/**
 * Roll damage with optional crit.
 * @param {number} dieSides - Die type (e.g. 6 for d6)
 * @param {number} dieCount - Number of dice
 * @param {number} bonus    - Flat bonus (strength modifier etc.)
 * @param {boolean} crit    - Whether this is a critical hit (doubles dice)
 * @returns {number}
 */
export function rollDamage(dieSides, dieCount, bonus = 0, crit = false) {
  const rolls = crit ? dieCount * 2 : dieCount;
  let total = bonus;
  for (let i = 0; i < rolls; i++) total += roll(dieSides);
  return Math.max(1, total);
}
