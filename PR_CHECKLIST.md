# PR_CHECKLIST.md

This checklist is required for all pull requests that change Blue Lotus core, templates, components, or CI. It is intentionally short and actionable so reviewers and CI can enforce quality without slowing iteration.

## Required before requesting review
- [ ] **Branch name** follows convention: `feature/`, `fix/`, `chore/`, or `template/` with a short slug.
- [ ] **PR description** includes purpose, scope, and any manual steps to verify.
- [ ] **All tests pass locally**: `npm test` (unit + lint).
- [ ] **Build succeeds locally**: `npm run build`.

## Code quality and architecture
- [ ] **Tokens used**: UI styles use tokens (import from `src/tokens/tokens.js`) or document why an exception is needed.
- [ ] **Component API** follows conventions: `variant`, `size`, `className`, `style` where applicable.
- [ ] **ComponentRegistry** updated if new components are added or renamed.
- [ ] **No inline magic values** for colors, spacing, radii — use tokens or document rationale.

## Documentation and discoverability
- [ ] **Manifest updated** (`components.json` or template manifest) with prop metadata and default props.
- [ ] **README or component docs** updated with usage examples and prop descriptions.
- [ ] **Template changes** include a JSON template in `src/builder/templates/` when relevant.

## Tests and visual/a11y checks
- [ ] **Unit tests** added/updated for new logic or components.
- [ ] **Snapshot or visual tests** added for UI changes (if applicable).
- [ ] **Accessibility**: run axe checks locally and fix critical violations; document any remaining issues.

## CI and release
- [ ] **CI green** on branch (GitHub Actions will run tests/build).
- [ ] **Secrets**: no secrets or tokens committed; use GitHub Secrets for deploy keys.
- [ ] **Versioning**: bump template or package version if public API or template shape changed.

## Security and privacy
- [ ] **No sensitive data** (API keys, tokens, personal data) in code, templates, or examples.
- [ ] **Dependencies** reviewed for major vulnerabilities; update or document risk.

## Review and merge
- [ ] **Assign reviewers**: at least one frontend maintainer and one UX/Design reviewer for UI changes.
- [ ] **Merge strategy**: use squash or merge commit per repo policy; include changelog entry if needed.
- [ ] **Post-merge**: confirm preview deploy URL and smoke-test the published builder/template.

---

**How to use:** Copy this file into the repo root. Reviewers should verify each checked item before approving. If an item is intentionally skipped, document the reason in the PR description.
