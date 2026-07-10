// js/game-utils.js
// WSL Saga Multiverse — Pure utility functions (browser + Node.js)
// © 2026 P&B DevCo · Paul Adcock · All Rights Reserved

/**
 * Test whether two circles overlap.
 * Uses squared-distance comparison to avoid an unnecessary Math.sqrt call.
 *
 * @param {number} ax - Circle A center X
 * @param {number} ay - Circle A center Y
 * @param {number} ar - Circle A radius
 * @param {number} bx - Circle B center X
 * @param {number} by - Circle B center Y
 * @param {number} br - Circle B radius
 * @returns {boolean} true if the circles overlap
 */
function circleCollides(ax, ay, ar, bx, by, br) {
  const dx = ax - bx;
  const dy = ay - by;
  const minDist = ar + br;
  return (dx * dx + dy * dy) < (minDist * minDist);
}

// CommonJS export for Node.js tests; no-op in browsers
if (typeof module !== 'undefined') {
  module.exports = { circleCollides };
}
