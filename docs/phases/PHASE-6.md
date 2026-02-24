# Phase 6 — Docusaurus Docs Site, Figma Tokens & v1.0 GA 🔲

> **Version:** v1.0.0
> **Status:** 🔲 Planned (Target: June 2026)
> **Theme:** Docs site live · Design token export · Stable API guarantee · General Availability

---

## Goal

Ship `neopop-rn` v1.0.0 as a production-ready, stable library. Deliver a live Docusaurus documentation site, design token exports (Figma, CSS, Android, iOS), and make the general availability announcement. After this milestone, the public API is stable and any breaking change requires a major version bump.

---

## Workstreams Active This Phase

| Workstream | Focus |
|---|---|
| A — Core library | Zero open P0/P1 bugs; final pre-release polish |
| B — Quality | Final CI checks; zero warnings; coverage ≥90% |
| D — Documentation | Docusaurus site, MDX migration, design token export |

---

## Deliverables

### MS-16 · Docusaurus docs site 🔲

- [ ] Docusaurus 3.x site scaffold in `website/` (or separate `neopop-rn-docs` repo — TBD)
- [ ] All markdown from MS-15 migrated to MDX format
  - [ ] Prop tables rendered as interactive React components
  - [ ] Code examples syntax-highlighted with Prism
  - [ ] Live component previews via Storybook embed or custom MDX component (if feasible)
- [ ] Versioned docs:
  - [ ] v0.x archive (latest 0.x tagged snapshot)
  - [ ] v1.0 as the current stable version
- [ ] Algolia DocSearch integration (or Docusaurus built-in search as fallback)
- [ ] Dark mode matching NeoPop aesthetic (custom Docusaurus theme)
- [ ] Navbar links: Docs, API Reference, Components, GitHub, npm
- [ ] Deployed to GitHub Pages or Vercel on every release tag push
- [ ] Custom domain configured (if available)
- [ ] `README.md` homepage field in `package.json` updated to live docs URL
- [ ] Link from `README.md` to docs site prominent above fold

---

### MS-17 · Design token export (Figma / Style Dictionary) 🔲

- [ ] **Style Dictionary config** (`style-dictionary.config.js`) to transform `src/primitives/`:
  - [ ] Figma Tokens JSON format (compatible with Tokens Studio Figma plugin)
  - [ ] CSS custom properties (`--neopop-color-black-100: #...`)
  - [ ] Android `colors.xml` and `dimens.xml`
  - [ ] iOS Swift color extension constants
- [ ] **Token output directory:** `tokens/` (committed to repo; also published as a release artifact)
- [ ] **Figma component library:**
  - [ ] All 27+ components as Figma components (manual creation or Tokens plugin sync)
  - [ ] Dark + light theme modes in Figma
  - [ ] Published as a Figma Community resource
- [ ] **`docs/TOKENS.md`** updated to reference all exported formats with download links
- [ ] **CI integration:** `token:export` script runs as part of release pipeline; token files committed or attached to release assets

---

### MS-18 · v1.0 GA release 🔲

#### Pre-release checklist

- [ ] All MS-08 through MS-17 items complete
- [ ] Zero open P0 or P1 GitHub issues
- [ ] `yarn typecheck` passes with zero errors
- [ ] `yarn lint` passes with zero warnings
- [ ] `yarn test --coverage` passes ≥90% on all metrics
- [ ] All Storybook stories verified on iOS, Android, and Expo Web

#### Release steps

- [ ] Bump `package.json` version to `1.0.0`
- [ ] Update `CHANGELOG.md` with full `[1.0.0]` section
- [ ] Commit: `chore(release): 1.0.0`
- [ ] Tag: `v1.0.0`
- [ ] Push commit + tag to `main`
- [ ] GitHub Actions `release.yml` triggers: typecheck → lint → test → `bob build` → `npm publish`
- [ ] Create GitHub release: `gh release create v1.0.0 --title "v1.0.0 — General Availability" --notes-file ...`
- [ ] Verify npm package is live: `npm info neopop-rn version` → `1.0.0`

#### Post-release

- [ ] `README.md` updated: stable API guarantee statement added
- [ ] `package.json` `"homepage"` field set to live docs URL
- [ ] Announcement post: GitHub Discussions + Twitter/X + relevant RN communities
- [ ] Figma Community resource published / linked from README
- [ ] Pin `@shopify/react-native-skia` peer dep floor in CI matrix for Skia 1.x and 2.x

---

## Commit Plan

| Commit | Content |
|---|---|
| `docs(site): scaffold Docusaurus 3.x in website/` | Site structure |
| `docs(site): migrate MS-15 markdown to MDX` | Content migration |
| `docs(site): add versioned docs (v0.x archive, v1.0 current)` | Versioning |
| `docs(site): Algolia search + dark mode theme` | Search + theme |
| `ci: deploy docs to GitHub Pages on release tag` | Deploy pipeline |
| `feat(tokens): add Style Dictionary config + token export` | MS-17 |
| `feat(tokens): publish CSS, Android, iOS, Figma token files` | Token output |
| `docs: update TOKENS.md with export format references` | Token docs |
| `chore(release): 1.0.0` | v1.0.0 release |

---

## Definition of Done

- [ ] Docusaurus site is live at a public URL
- [ ] All 27+ component docs pages are reachable on the site
- [ ] Versioned docs work (v0.x archive + v1.0 current)
- [ ] Search (Algolia or built-in) works on the site
- [ ] Design token export script runs via `yarn tokens:export`
- [ ] Figma Tokens JSON, CSS custom properties, Android XML, iOS Swift outputs committed in `tokens/`
- [ ] `package.json` version is `1.0.0`
- [ ] npm package published with `latest` tag
- [ ] Zero open P0/P1 GitHub issues
- [ ] Stable API guarantee documented in `README.md`
- [ ] `CHANGELOG.md` updated
- [ ] GitHub release created with full release notes
- [ ] `docs/MILESTONES.md` MS-16, MS-17, MS-18 checked

---

## Notes

- v1.0.0 triggers the **stable API guarantee**: any breaking prop change after this requires a major version bump (v2.0.0).
- The New Architecture (Fabric/Turbo Modules) upgrade is explicitly scoped to v2.0.0, not this release. v1.0 targets RN ≥ 0.73, the stable baseline.
- After v1.0.0, CHANGELOG.md follows strict SemVer labels: `Breaking`, `Added`, `Changed`, `Deprecated`, `Removed`, `Fixed`, `Security`.
