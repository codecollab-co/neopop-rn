import {
  mergeDeep,
  generateTextStyle,
} from '../../src/utils/helpers';
import {
  hexToRGBA,
  deriveEdgeColor,
  getLuminance,
} from '../../src/utils/colorUtils';
import { FontType, FontWeight } from '../../src/primitives/typography';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Measure the execution time of a synchronous function in milliseconds. */
function measure(fn: () => void): number {
  const start = performance.now();
  fn();
  return performance.now() - start;
}

// ─── mergeDeep ────────────────────────────────────────────────────────────────

describe('mergeDeep performance', () => {
  it('merges a 5-level deep object in < 50 ms', () => {
    const base = {
      l1: {
        l2: {
          l3: {
            l4: {
              l5: { a: 1, b: 2, c: 3 },
              d: 'hello',
            },
            e: [1, 2, 3],
          },
          f: true,
        },
        g: 'world',
      },
      h: 42,
    };

    const override = {
      l1: {
        l2: {
          l3: {
            l4: {
              l5: { a: 99, d: 4 },
            },
          },
        },
      },
    };

    const elapsed = measure(() => {
      for (let i = 0; i < 100; i++) {
        mergeDeep(base, override as any);
      }
    });

    // 100 iterations of a 5-level deep merge should complete in < 50 ms
    expect(elapsed).toBeLessThan(50);
  });
});

// ─── hexToRGBA ────────────────────────────────────────────────────────────────

describe('hexToRGBA performance', () => {
  it('converts 1000 hex values in < 50 ms', () => {
    const elapsed = measure(() => {
      for (let i = 0; i < 1000; i++) {
        hexToRGBA('#ff6600', 0.8);
      }
    });

    expect(elapsed).toBeLessThan(50);
  });
});

// ─── generateTextStyle ───────────────────────────────────────────────────────

describe('generateTextStyle performance', () => {
  it('generates styles for all FontType × FontWeight combos in < 50 ms', () => {
    const fontTypes = Object.values(FontType);
    const fontWeights = Object.values(FontWeight);

    const elapsed = measure(() => {
      for (const ft of fontTypes) {
        for (const fw of fontWeights) {
          generateTextStyle(ft, 16, fw);
        }
      }
    });

    // 4 FontTypes × 6 FontWeights = 24 combinations
    expect(elapsed).toBeLessThan(50);
  });
});

// ─── deriveEdgeColor ─────────────────────────────────────────────────────────

describe('deriveEdgeColor performance', () => {
  it('derives edge colors 1000 times in < 200 ms', () => {
    const elapsed = measure(() => {
      for (let i = 0; i < 1000; i++) {
        deriveEdgeColor('#3d3d3d');
      }
    });

    expect(elapsed).toBeLessThan(200);
  });
});

// ─── getLuminance ─────────────────────────────────────────────────────────────

describe('getLuminance performance', () => {
  it('computes luminance 1000 times in < 50 ms', () => {
    const elapsed = measure(() => {
      for (let i = 0; i < 1000; i++) {
        getLuminance('#abcdef');
      }
    });

    expect(elapsed).toBeLessThan(50);
  });
});
