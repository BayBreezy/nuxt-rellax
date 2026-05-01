# Contributing to nuxt-rellax

Thanks for your interest in contributing! This guide covers everything you need to get started.

## Development setup

**Prerequisites:** [Bun](https://bun.sh) v1.3+, Node.js 18+

```bash
git clone https://github.com/BayBreezy/nuxt-rellax.git
cd nuxt-rellax
bun install
bun run dev:prepare   # build stub + prepare Nuxt
bun run dev           # start the docs dev server
```

The docs site at `http://localhost:3000` hot-reloads as you edit files under `docs/` or `src/`.

## Project structure

```
nuxt-rellax/
├── src/                  # Module source (composables, directive, component)
│   ├── module.ts         # Nuxt module entry
│   ├── runtime/
│   │   ├── composables/  # useRellax, useRellaxGroup
│   │   ├── components/   # RellaxElement
│   │   └── plugins/      # v-rellax directive
├── test/                 # Vitest tests + fixtures
│   └── fixtures/basic/
├── docs/                 # Documentation site
│   └── app/components/content/   # Interactive example components
└── .github/              # CI, templates, Dependabot
```

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Your commit message header must follow this pattern:

```
<type>(<optional scope>): <description>
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `style`.

A `commit-msg` hook runs automatically via Husky to enforce this. Max header length is 200 characters.

Examples:
```
feat: add callback option to useRellax
fix: prevent getAttribute error when wrapper ref is null
docs: update speed table to reflect Rellax behavior
test: add coverage for useRellaxGroup destroy/reinit
```

## Making changes

### Module changes (src/)

1. Edit files under `src/`.
2. Run `bun run dev:prepare` if you add new auto-imports or change the module API.
3. Add or update tests under `test/`. Run `bun run test` to verify.
4. Run `bun run fmt` before committing.

### Documentation changes (docs/)

1. Edit Markdown under `docs/content/` or Vue components under `docs/app/`.
2. The dev server hot-reloads — verify your change visually.
3. Code blocks inside `.md` files that are marked `<!-- automd:file ... -->` are auto-generated. Run `bun run automd:docs` to sync them from the actual component source.

## Running checks locally

```bash
bun run fmt:check   # formatting (oxfmt)
bunx eslint .       # linting
bun run test        # unit / integration tests
```

All three run in CI on every pull request.

## Submitting a pull request

1. Fork the repo and create a branch from `main`.
2. Make your changes following the guidelines above.
3. Ensure all checks pass locally.
4. Open a PR — fill out the PR template.
5. A maintainer will review and merge.

## Reporting bugs / requesting features

Use the GitHub issue templates:
- **Bug report** — include a minimal reproduction.
- **Feature request** — describe the problem you're solving, not just the solution.
