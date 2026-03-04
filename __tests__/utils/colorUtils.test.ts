import {
  hexToRGBA,
  getLuminance,
  isColorDark,
  getContrastColor,
  adjustLightness,
  getHorizontalShadow,
  getVerticalShadow,
  deriveEdgeColor,
  deriveHighlightEdgeColor,
} from '../../src/utils/colorUtils';

// ─── hexToRGBA ────────────────────────────────────────────────────────────────

describe('hexToRGBA', () => {
  it('converts a 6-digit hex with alpha to rgba()', () => {
    expect(hexToRGBA('#ff0000', 0.5)).toBe('rgba(255,0,0,0.5)');
  });

  it('converts a 6-digit hex without alpha to rgb()', () => {
    expect(hexToRGBA('#00ff00')).toBe('rgb(0,255,0)');
  });

  it('converts a 3-digit hex correctly', () => {
    // #f00 expands to #ff0000
    expect(hexToRGBA('#f00')).toBe('rgb(255,0,0)');
  });

  it('clamps alpha > 1 to 1', () => {
    expect(hexToRGBA('#ffffff', 2)).toBe('rgba(255,255,255,1)');
  });

  it('clamps alpha < 0 to 0', () => {
    expect(hexToRGBA('#000000', -0.5)).toBe('rgba(0,0,0,0)');
  });

  it('handles a 6-digit hex without # prefix gracefully', () => {
    expect(hexToRGBA('0000ff')).toBe('rgb(0,0,255)');
  });
});

// ─── getLuminance ─────────────────────────────────────────────────────────────

describe('getLuminance', () => {
  it('returns approximately 0 for black', () => {
    expect(getLuminance('#000000')).toBeCloseTo(0, 5);
  });

  it('returns approximately 1 for white', () => {
    expect(getLuminance('#ffffff')).toBeCloseTo(1, 5);
  });

  it('returns a value in (0, 1) for #06C270', () => {
    const lum = getLuminance('#06C270');
    expect(lum).toBeGreaterThan(0);
    expect(lum).toBeLessThan(1);
    // #06C270 (r=6, g=194, b=112) — luminance is in the mid-range (~0.3–0.5)
    expect(lum).toBeGreaterThan(0.3);
    expect(lum).toBeLessThan(0.55);
  });
});

// ─── isColorDark ─────────────────────────────────────────────────────────────

describe('isColorDark', () => {
  it('returns true for black', () => {
    expect(isColorDark('#000000')).toBe(true);
  });

  it('returns false for white', () => {
    expect(isColorDark('#ffffff')).toBe(false);
  });

  it('returns true for a mid-grey below the 0.3 threshold (#8A8A8A)', () => {
    // #8A8A8A luminance ≈ 0.276 — just below 0.3, so it's "dark"
    const lum = getLuminance('#8A8A8A');
    expect(lum).toBeLessThan(0.3);
    expect(isColorDark('#8A8A8A')).toBe(true);
  });

  it('returns false for a clearly light color', () => {
    // Pure yellow is very bright
    expect(isColorDark('#ffff00')).toBe(false);
  });
});

// ─── getContrastColor ─────────────────────────────────────────────────────────

describe('getContrastColor', () => {
  it('returns #ffffff for a dark background', () => {
    expect(getContrastColor('#000000')).toBe('#ffffff');
  });

  it('returns #0d0d0d for a light background', () => {
    expect(getContrastColor('#ffffff')).toBe('#0d0d0d');
  });

  it('uses 0.179 as the luminance threshold', () => {
    // #06C270 has luminance ≈ 0.452 > 0.179 → light text
    expect(getContrastColor('#06C270')).toBe('#0d0d0d');
  });
});

// ─── adjustLightness ─────────────────────────────────────────────────────────

describe('adjustLightness', () => {
  it('lightens a dark color with a positive delta', () => {
    // Black (#000000) lightened by 0.5 should no longer be black
    const result = adjustLightness('#000000', 0.5);
    expect(result).not.toBe('#000000');
    // The result should be lighter (grey or similar)
    expect(getLuminance(result)).toBeGreaterThan(getLuminance('#000000'));
  });

  it('darkens a light color with a negative delta', () => {
    const result = adjustLightness('#ffffff', -0.4);
    expect(result).not.toBe('#ffffff');
    expect(getLuminance(result)).toBeLessThan(getLuminance('#ffffff'));
  });

  it('clamps at 0 — darkening black stays black', () => {
    expect(adjustLightness('#000000', -0.5)).toBe('#000000');
  });

  it('clamps at 1 — lightening white stays white', () => {
    expect(adjustLightness('#ffffff', 0.5)).toBe('#ffffff');
  });

  it('returns a valid hex string', () => {
    const result = adjustLightness('#4a90d9', 0.1);
    expect(result).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

// ─── getHorizontalShadow ──────────────────────────────────────────────────────

describe('getHorizontalShadow', () => {
  it('lightens a dark color (luminance < 0.3)', () => {
    // #000000 is dark; horizontal shadow lightens by +0.2
    const result = getHorizontalShadow('#000000');
    expect(getLuminance(result)).toBeGreaterThan(getLuminance('#000000'));
  });

  it('darkens a light color (luminance >= 0.3)', () => {
    // #ffffff is light; horizontal shadow darkens by -0.1
    const result = getHorizontalShadow('#ffffff');
    expect(getLuminance(result)).toBeLessThan(getLuminance('#ffffff'));
  });

  it('returns a valid hex string', () => {
    expect(getHorizontalShadow('#4a90d9')).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

// ─── getVerticalShadow ────────────────────────────────────────────────────────

describe('getVerticalShadow', () => {
  it('lightens a dark color, but less than horizontal (+0.1 vs +0.2)', () => {
    // Both lighten black, but vertical delta is smaller
    const vert = getLuminance(getVerticalShadow('#000000'));
    const horiz = getLuminance(getHorizontalShadow('#000000'));
    expect(vert).toBeLessThan(horiz);
  });

  it('darkens a light color more than horizontal (-0.2 vs -0.1)', () => {
    // Both darken white, but vertical delta is larger (more dark)
    const vert = getLuminance(getVerticalShadow('#ffffff'));
    const horiz = getLuminance(getHorizontalShadow('#ffffff'));
    expect(vert).toBeLessThan(horiz);
  });

  it('returns a valid hex string', () => {
    expect(getVerticalShadow('#4a90d9')).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

// ─── deriveEdgeColor ─────────────────────────────────────────────────────────

describe('deriveEdgeColor', () => {
  it('returns an object with right and bottom keys', () => {
    const result = deriveEdgeColor('#4a90d9');
    expect(result).toHaveProperty('right');
    expect(result).toHaveProperty('bottom');
  });

  it('right equals getHorizontalShadow(faceColor)', () => {
    const faceColor = '#4a90d9';
    expect(deriveEdgeColor(faceColor).right).toBe(getHorizontalShadow(faceColor));
  });

  it('bottom equals getVerticalShadow(faceColor)', () => {
    const faceColor = '#4a90d9';
    expect(deriveEdgeColor(faceColor).bottom).toBe(getVerticalShadow(faceColor));
  });

  it('works for black', () => {
    const result = deriveEdgeColor('#000000');
    expect(result.right).toMatch(/^#[0-9a-f]{6}$/i);
    expect(result.bottom).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

// ─── deriveHighlightEdgeColor ─────────────────────────────────────────────────

describe('deriveHighlightEdgeColor', () => {
  it('lightens a dark input color', () => {
    const input = '#1a1a1a'; // very dark
    const result = deriveHighlightEdgeColor(input);
    expect(getLuminance(result)).toBeGreaterThan(getLuminance(input));
  });

  it('darkens a light input color', () => {
    const input = '#f0f0f0'; // very light
    const result = deriveHighlightEdgeColor(input);
    expect(getLuminance(result)).toBeLessThan(getLuminance(input));
  });

  it('returns a valid hex string', () => {
    expect(deriveHighlightEdgeColor('#4a90d9')).toMatch(/^#[0-9a-f]{6}$/i);
  });
});
