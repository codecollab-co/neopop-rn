# perf/ — Performance tooling for neopop-rn

## Files

| File | Description |
|------|-------------|
| `BENCHMARKS.md` | Full performance benchmark report with animation, Skia, and bundle analysis |
| `bundle-size.js` | Node.js script that reports compiled output size with per-component breakdown |

## Running the bundle size report

```bash
# 1. Build the library first
npm run prepare

# 2. Run the size report
node perf/bundle-size.js
```

## CI integration

The bundle size script is run in CI after the build step on the main branch.
Results are printed in the workflow log. To compare sizes across PRs, check the
CI logs for the "Bundle size report" step.

## Performance targets

| Metric | Target |
|--------|--------|
| Full library gzip (ESM) | < 50 KB |
| Per-component average | < 3 KB gzip |
| JS thread work per frame | < 1 ms |
| Reanimated UI-thread coverage | 100% of animated components |
| Skia canvas draw calls per frame | < 10 per component |

## Methodology

- **Bundle size**: measured via Node.js `zlib.gzipSync` on compiled ESM output
- **Animation thread**: audited by reviewing `useSharedValue` / `useDerivedValue` / `withTiming` / `withSpring` usage — all run on Reanimated's UI thread
- **Skia render**: counted Skia draw primitives (Path, Rect, Circle, etc.) per component
- **JS thread budget**: confirmed no synchronous heavy computation in render paths
