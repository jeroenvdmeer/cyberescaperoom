# Cyber Escape Room — CLAUDE.md

An educational web app with 7 login-form challenges that teach web security concepts.
Live at https://escape.jero.net/.

## Project Structure

```
cyberescaperoom/
├── app/          # React 19 SPA (Vite 8 / rolldown)
├── api/          # Azure Functions backend (login API)
├── docs/         # Project documentation
└── .github/
    ├── workflows/azure-static-web-apps.yml  # CI/CD — gates deploy on test+build
    └── dependabot.yml
```

## Architecture

### Frontend (`app/`)
- **React 19** SPA built with **Vite 8** (rolldown bundler)
- **Chakra UI v3** for UI components, **@emotion/react** for styling
- **React Router v7** for client-side routing
- **next-themes** for dark/light mode
- Tests: **Vitest 4** + jsdom + @testing-library/react
- Source files live in `app/src/`; entry point is `app/src/index.js`

### Backend (`api/`)
- **Azure Functions** (Node.js) providing the login API
- Key files: `api/Login/index.js`, `api/ValidateTokens/index.js`, `api/Shared/tokens.js`

### Deployment
- Deployed to **Azure Static Web Apps**
- The CI workflow (`.github/workflows/azure-static-web-apps.yml`) runs a `Test and Build` job that must pass before any deploy proceeds.

## JSX-in-.js Setup

All React component source files use the `.js` extension (not `.jsx`), even when containing JSX. Vite 8's Oxc transformer treats `.js` as plain JavaScript by default and excludes it from JSX transformation. To handle this:

- `app/vite.config.js` defines a custom `enforce: 'pre'` plugin (`jsxInJs`) that runs Vite's `transformWithOxc` API over every `src/**/*.js` file with `lang: 'jsx'` and the React automatic runtime.
- This pre-transform runs before the built-in Oxc/rolldown transform and `@vitejs/plugin-react`, so all downstream steps only ever see plain compiled JS.
- The behaviour is identical across dev server, `vite build`, and the Vitest environment.

**Do not rename `.js` files to `.jsx`** — the plugin handles transformation correctly as-is.

## Chakra UI v3 API notes

This app is on Chakra v3; many v1/v2 APIs were removed (their imports build-fail or silently no-op). When editing components:
- `IconButton` takes the icon as **children**, not an `icon` prop — and always needs `aria-label`.
- No `CircularProgress` — use `Spinner` (or `ProgressCircle.Root`).
- No `InputRightElement`/`InputLeftElement` — use `InputGroup` with the `endElement`/`startElement` prop.
- Lists are `List.Root`/`List.Item` (not `List`/`ListItem`); forms are `Field.Root`/`Field.Label` (not `FormControl`/`FormLabel`).
- Toasts: `toaster.create()` imported from `src/components/ui/toaster` (not the `useToast` hook).
- Color-mode hooks (`useColorMode`, `useColorModeValue`) come from `src/components/ui/color-mode`, not `@chakra-ui/react`.
- Verify what the installed version actually exports: `node -e "const c=require('@chakra-ui/react'); console.log('IconButton' in c)"` (run from `app/`).

## Commands

- `yarn start` — start Vite dev server at http://localhost:5173
- `yarn build` — production build to `app/build/`
- `yarn test` — run tests in watch mode (local)
- `yarn test run` — run tests once (used in CI)
- `swa start http://localhost:5173 --run "yarn start" --app-location ./app --api ./api` — full local dev with Azure Functions API (requires `@azure/static-web-apps-cli` and `azure-functions-core-tools@3`)

All yarn commands are run from the `app/` directory.

## Testing notes

- Component render tests need the `window.matchMedia` stub in `app/src/setupTests.js` (next-themes calls it; jsdom lacks it).
- `@testing-library/dom` is a required peer of `@testing-library/react` — keep it in devDependencies.
- `Container` renders a `Spinner` while `useAuth` is loading, so assert UI with async `await screen.findByRole(...)`; `localStorage.clear()` in `beforeEach` keeps auth from hitting `fetch`.

## Critical Constraints

### Build must never be minified
`vite.config.js` has `build: { minify: false }`. This is intentional: students read
the unminified source in browser DevTools as part of the educational challenges.
**Do not enable minification under any circumstances.**

### Do not fix intentional vulnerabilities
The following are educational features, not bugs:
- Hardcoded passwords in `api/Login/index.js`
- Plain-text token storage in `localStorage` (`app/src/utils/localstorage.js`)
- Client-side password check in `app/src/components/Login.js` (level 3)
- MD5 hash in API error responses (`api/Login/index.js`, levels 5-6)
- The HTML comment `<!-- Level 2: Welcome01! -->` in `app/index.html`

Fixing any of these breaks the escape room challenges.

## Claude Code Skills

Skills available for this project:
- `/run` — launch the app and verify a change works in the browser
- `/verify` — confirm a fix or feature works end-to-end
- `/code-review` — review the current diff for bugs and improvements
- `/security-review` — security review of pending changes (use before merging)
- `/frontend-design` — build polished frontend components
- Chakra UI skills (from `chakra-ui.com/docs/get-started/ai/skills`) — best for *new component design*; for v3 API correctness on the installed version, prefer the export check in "Chakra UI v3 API notes" above:
  - `chakra-ui-builder` — build new Chakra UI v3 components
  - `chakra-ui-migrate` — guidance for Chakra UI v2→v3 migration patterns
  - `chakra-ui-refactor` — review and improve existing Chakra UI components
