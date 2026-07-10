'use strict';

const { circleCollides } = require('../js/game-utils');

describe('circleCollides', () => {
  test('returns true when circles clearly overlap', () => {
    // Two circles of radius 10 centered only 5 apart — deeply overlapping
    expect(circleCollides(0, 0, 10, 5, 0, 10)).toBe(true);
  });

  test('returns false when circles are clearly separate', () => {
    // Two circles of radius 5 centered 100 apart — not touching
    expect(circleCollides(0, 0, 5, 100, 0, 5)).toBe(false);
  });

  test('returns true when circles touch exactly (boundary)', () => {
    // Distance == sum of radii is NOT a collision (strictly less than)
    expect(circleCollides(0, 0, 5, 10, 0, 5)).toBe(false);
  });

  test('returns true when circles overlap by one unit', () => {
    // Distance 9 < sum of radii 10
    expect(circleCollides(0, 0, 5, 9, 0, 5)).toBe(true);
  });

  test('returns true for concentric circles', () => {
    expect(circleCollides(0, 0, 10, 0, 0, 5)).toBe(true);
  });

  test('works with diagonal separation', () => {
    // 3-4-5 right triangle: distance = 5, radii sum = 4, no collision
    expect(circleCollides(0, 0, 2, 3, 4, 2)).toBe(false);
    // radii sum = 6 > 5, collision
    expect(circleCollides(0, 0, 3, 3, 4, 3)).toBe(true);
  });

  test('treats zero-radius circles as points', () => {
    // Two points at different locations — no overlap
    expect(circleCollides(0, 0, 0, 1, 0, 0)).toBe(false);
    // Two points at the same location — distance is 0, minDist is 0, strictly less than fails
    expect(circleCollides(0, 0, 0, 0, 0, 0)).toBe(false);
    // Point inside a circle — distance 0 < radius 5
    expect(circleCollides(0, 0, 0, 0, 0, 5)).toBe(true);
  });
});
