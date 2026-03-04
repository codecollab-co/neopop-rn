import {
  isEmpty,
  isObject,
  mergeDeep,
  getRandomInt,
  currencyFormatter,
  generateTextStyle,
} from '../../src/utils/helpers';
import { FontType, FontWeight, LINE_HEIGHT_MULTIPLIER } from '../../src/primitives/typography';

// ─── isEmpty ─────────────────────────────────────────────────────────────────

describe('isEmpty', () => {
  it('returns true for null', () => expect(isEmpty(null)).toBe(true));
  it('returns true for undefined', () => expect(isEmpty(undefined)).toBe(true));
  it('returns true for empty string', () => expect(isEmpty('')).toBe(true));
  it('returns true for whitespace-only string', () => expect(isEmpty('  ')).toBe(true));
  it('returns false for non-empty string', () => expect(isEmpty('a')).toBe(false));
  it('returns true for empty array', () => expect(isEmpty([])).toBe(true));
  it('returns false for non-empty array', () => expect(isEmpty([1])).toBe(false));
  it('returns true for empty object', () => expect(isEmpty({})).toBe(true));
  it('returns false for non-empty object', () => expect(isEmpty({ a: 1 })).toBe(false));
  it('returns true for empty Map', () => expect(isEmpty(new Map())).toBe(true));
  it('returns false for non-empty Map', () => expect(isEmpty(new Map([[1, 2]]))).toBe(false));
  it('returns true for empty Set', () => expect(isEmpty(new Set())).toBe(true));
  it('returns false for non-empty Set', () => expect(isEmpty(new Set([1]))).toBe(false));
  it('returns false for 0', () => expect(isEmpty(0)).toBe(false));
  it('returns false for false', () => expect(isEmpty(false)).toBe(false));
});

// ─── isObject ────────────────────────────────────────────────────────────────

describe('isObject', () => {
  it('returns true for {}', () => expect(isObject({})).toBe(true));
  it('returns true for { a: 1 }', () => expect(isObject({ a: 1 })).toBe(true));
  it('returns false for an array', () => expect(isObject([])).toBe(false));
  it('returns false for null', () => expect(isObject(null)).toBe(false));
  it('returns false for a string', () => expect(isObject('string')).toBe(false));
  it('returns false for a number', () => expect(isObject(42)).toBe(false));
  it('returns true for a Map (any non-null non-array object)', () => expect(isObject(new Map())).toBe(true));
});

// ─── mergeDeep ───────────────────────────────────────────────────────────────

describe('mergeDeep', () => {
  it('performs a shallow merge when sources have no nested objects', () => {
    const result = mergeDeep({ a: 1, b: 2 } as Record<string, unknown>, { b: 99 });
    expect(result).toEqual({ a: 1, b: 99 });
  });

  it('performs a deep 2-level merge', () => {
    const target = { a: { x: 1, y: 2 }, b: 3 } as Record<string, unknown>;
    const source = { a: { y: 99 } };
    const result = mergeDeep(target, source);
    expect(result).toEqual({ a: { x: 1, y: 99 }, b: 3 });
  });

  it('merges three sources from left to right', () => {
    const result = mergeDeep(
      { a: 1 } as Record<string, unknown>,
      { b: 2 },
      { c: 3, a: 10 },
    );
    expect(result).toEqual({ a: 10, b: 2, c: 3 });
  });

  it('replaces array values (does not merge them)', () => {
    const target = { arr: [1, 2, 3] } as Record<string, unknown>;
    const source = { arr: [4, 5] };
    const result = mergeDeep(target, source);
    expect(result.arr).toEqual([4, 5]);
  });

  it('does not overwrite with undefined source values', () => {
    const target = { a: 1, b: 2 } as Record<string, unknown>;
    const source: Record<string, unknown> = { a: undefined };
    const result = mergeDeep(target, source);
    expect(result.a).toBe(1);
  });

  it('does not mutate the original target', () => {
    const target = { a: { x: 1 } } as Record<string, unknown>;
    mergeDeep(target, { a: { x: 99 } });
    expect((target.a as Record<string, unknown>).x).toBe(1);
  });
});

// ─── getRandomInt ─────────────────────────────────────────────────────────────

describe('getRandomInt', () => {
  it('returns an integer', () => {
    const result = getRandomInt(1, 10);
    expect(Number.isInteger(result)).toBe(true);
  });

  it('result is within [min, max] over many samples', () => {
    for (let i = 0; i < 100; i++) {
      const r = getRandomInt(5, 15);
      expect(r).toBeGreaterThanOrEqual(5);
      expect(r).toBeLessThanOrEqual(15);
    }
  });

  it('returns the only possible value when min === max', () => {
    expect(getRandomInt(7, 7)).toBe(7);
  });
});

// ─── currencyFormatter ────────────────────────────────────────────────────────

describe('currencyFormatter', () => {
  it('formats 1299 INR and contains 1,299', () => {
    const result = currencyFormatter(1299, '', 0, 'inr');
    expect(result).toContain('1,299');
  });

  it('formats 49.99 USD and contains 49.99', () => {
    const result = currencyFormatter(49.99, 'N/A', 2, 'usd');
    expect(result).toContain('49.99');
  });

  it('returns fallback for NaN input', () => {
    const result = currencyFormatter(NaN, 'FALLBACK');
    expect(result).toBe('FALLBACK');
  });

  it('parses a string amount correctly', () => {
    const result = currencyFormatter('100', '', 0, 'inr');
    // Should not return fallback and should contain 100
    expect(result).toContain('100');
  });

  it('uses empty string fallback by default', () => {
    // NaN with no explicit fallback
    expect(currencyFormatter(NaN)).toBe('');
  });
});

// ─── generateTextStyle ────────────────────────────────────────────────────────

describe('generateTextStyle', () => {
  it('returns an object with fontSize, fontWeight, lineHeight, letterSpacing, color', () => {
    const style = generateTextStyle(FontType.BODY, 16, FontWeight.REGULAR);
    expect(style).toHaveProperty('fontSize', 16);
    expect(style).toHaveProperty('fontWeight', '400');
    expect(style).toHaveProperty('lineHeight');
    expect(style).toHaveProperty('letterSpacing');
    expect(style).toHaveProperty('color');
  });

  it('FontType.CAPS has textTransform = "uppercase"', () => {
    const style = generateTextStyle(FontType.CAPS, 12, FontWeight.BOLD);
    expect(style.textTransform).toBe('uppercase');
  });

  it('FontType.BODY has a lineHeight that is 1.5× the fontSize', () => {
    const fontSize = 14;
    const style = generateTextStyle(FontType.BODY, fontSize, FontWeight.REGULAR);
    const expected = Math.round(fontSize * LINE_HEIGHT_MULTIPLIER[FontType.BODY]);
    expect(style.lineHeight).toBe(expected);
  });

  it('FontType.HEADING has textTransform = "none"', () => {
    const style = generateTextStyle(FontType.HEADING, 24, FontWeight.BOLD);
    expect(style.textTransform).toBe('none');
  });

  it('uses the provided color', () => {
    const style = generateTextStyle(FontType.BODY, 16, FontWeight.REGULAR, '#ff0000');
    expect(style.color).toBe('#ff0000');
  });

  it('defaults color to #ffffff when none provided', () => {
    const style = generateTextStyle(FontType.BODY, 16, FontWeight.REGULAR);
    expect(style.color).toBe('#ffffff');
  });

  it('includes fontFamily when provided', () => {
    const style = generateTextStyle(FontType.BODY, 16, FontWeight.REGULAR, '#fff', 'Georgia');
    expect(style.fontFamily).toBe('Georgia');
  });

  it('omits fontFamily when not provided', () => {
    const style = generateTextStyle(FontType.BODY, 16, FontWeight.REGULAR);
    expect(style).not.toHaveProperty('fontFamily');
  });
});
