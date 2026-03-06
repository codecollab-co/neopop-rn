#!/usr/bin/env node
/**
 * perf/bundle-size.js
 * Reports the compiled output size of neopop-rn.
 *
 * Usage:
 *   npm run prepare  # build first
 *   node perf/bundle-size.js
 *
 * In CI, run after build step to track bundle size regressions.
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.join(__dirname, '..');
const LIB_DIR = path.join(ROOT, 'lib');
const SRC_DIR = path.join(ROOT, 'src');

function getFileSizeGzip(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    return zlib.gzipSync(content).length;
  } catch {
    return 0;
  }
}

function walkDir(dir, ext) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkDir(full, ext));
    } else if (!ext || entry.name.endsWith(ext)) {
      results.push(full);
    }
  }
  return results;
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

function report() {
  console.log('\n=== neopop-rn Bundle Size Report ===\n');

  // Check if lib/ exists (post-build)
  const hasLib = fs.existsSync(LIB_DIR);

  if (hasLib) {
    const cjsFiles   = walkDir(path.join(LIB_DIR, 'commonjs'), '.js');
    const esmFiles   = walkDir(path.join(LIB_DIR, 'module'),   '.js');
    const dtsFiles   = walkDir(path.join(LIB_DIR, 'typescript'), '.d.ts');

    const cjsTotal   = cjsFiles.reduce((s, f) => s + getFileSizeGzip(f), 0);
    const esmTotal   = esmFiles.reduce((s, f) => s + getFileSizeGzip(f), 0);
    const dtsTotal   = dtsFiles.reduce((s, f) => s + getFileSizeGzip(f), 0);

    console.log('Compiled output (lib/):');
    console.log(`  CJS (commonjs)    : ${formatBytes(cjsTotal)} gzip  (${cjsFiles.length} files)`);
    console.log(`  ESM (module)      : ${formatBytes(esmTotal)} gzip  (${esmFiles.length} files)`);
    console.log(`  TypeScript (.d.ts): ${formatBytes(dtsTotal)} gzip  (${dtsFiles.length} files)`);
    console.log(`  Total             : ${formatBytes(cjsTotal + esmTotal + dtsTotal)} gzip`);
    console.log('');

    // Per-component breakdown (ESM)
    const componentDir = path.join(LIB_DIR, 'module', 'components');
    if (fs.existsSync(componentDir)) {
      console.log('Per-component ESM size (gzip):');
      const components = fs.readdirSync(componentDir, { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => {
          const files = walkDir(path.join(componentDir, e.name), '.js');
          const size  = files.reduce((s, f) => s + getFileSizeGzip(f), 0);
          return { name: e.name, size };
        })
        .sort((a, b) => b.size - a.size);

      for (const { name, size } of components) {
        const bar = '\u2588'.repeat(Math.max(1, Math.round(size / 200)));
        console.log(`  ${name.padEnd(28)} ${formatBytes(size).padStart(10)}  ${bar}`);
      }
    }
  } else {
    // Fall back to src/ analysis
    console.log('lib/ not found — run "npm run prepare" first to build.\n');
    console.log('Source file analysis (src/):');

    const srcFiles = walkDir(SRC_DIR, '.ts').concat(walkDir(SRC_DIR, '.tsx'));
    const srcTotal = srcFiles.reduce((s, f) => s + getFileSizeGzip(f), 0);
    console.log(`  Source files : ${srcFiles.length} files, ${formatBytes(srcTotal)} gzip`);

    // Component breakdown
    const componentDir = path.join(SRC_DIR, 'components');
    if (fs.existsSync(componentDir)) {
      console.log('\nPer-component source size (gzip):');
      const components = fs.readdirSync(componentDir, { withFileTypes: true })
        .filter(e => e.isDirectory())
        .map(e => {
          const files = walkDir(path.join(componentDir, e.name));
          const size  = files.filter(f => f.endsWith('.ts') || f.endsWith('.tsx'))
                             .reduce((s, f) => s + getFileSizeGzip(f), 0);
          return { name: e.name, size };
        })
        .filter(c => c.size > 0)
        .sort((a, b) => b.size - a.size);

      for (const { name, size } of components) {
        const bar = '\u2588'.repeat(Math.max(1, Math.round(size / 100)));
        console.log(`  ${name.padEnd(28)} ${formatBytes(size).padStart(10)}  ${bar}`);
      }
    }
  }

  console.log('\nBundle size report complete.\n');
}

report();
