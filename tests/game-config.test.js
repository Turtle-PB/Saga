'use strict';

const { ARCS } = require('../js/game-config');

const REQUIRED_ARC_FIELDS = [
  'name', 'subtitle', 'bgColor', 'accent',
  'enemyColor', 'enemyName', 'bossName', 'bossColor',
  'dialogue', 'victoryText', 'playerColor', 'bulletColor',
];

const HEX_COLOR = /^#[0-9a-fA-F]{3,6}$/;

describe('ARCS configuration', () => {
  test('defines exactly 5 arcs', () => {
    expect(ARCS).toHaveLength(5);
  });

  test.each(ARCS.map((arc, i) => [arc.name, arc, i]))(
    'arc %s has all required fields',
    (_name, arc) => {
      for (const field of REQUIRED_ARC_FIELDS) {
        expect(arc).toHaveProperty(field);
        expect(arc[field]).toBeTruthy();
      }
    }
  );

  test.each(ARCS.map((arc) => [arc.name, arc]))(
    'arc %s has at least one dialogue entry with speaker and text',
    (_name, arc) => {
      expect(arc.dialogue.length).toBeGreaterThan(0);
      for (const entry of arc.dialogue) {
        expect(typeof entry.speaker).toBe('string');
        expect(entry.speaker.length).toBeGreaterThan(0);
        expect(typeof entry.text).toBe('string');
        expect(entry.text.length).toBeGreaterThan(0);
      }
    }
  );

  test.each(ARCS.map((arc) => [arc.name, arc]))(
    'arc %s colour fields are valid hex strings',
    (_name, arc) => {
      const colorFields = ['bgColor', 'accent', 'enemyColor', 'bossColor', 'playerColor', 'bulletColor'];
      for (const field of colorFields) {
        expect(arc[field]).toMatch(HEX_COLOR);
      }
    }
  );

  test('arc names are unique', () => {
    const names = ARCS.map((a) => a.name);
    expect(new Set(names).size).toBe(names.length);
  });
});
