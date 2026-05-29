import { defineConfig, transformWithOxc } from 'vite'
import react from '@vitejs/plugin-react'

// This project (migrated from CRA) authors JSX inside `.js` files (every React
// component, plus a JSX value in `src/utils/levels.js`). Vite 8 uses the Oxc
// transformer, which parses `.js` as plain JavaScript (JSX disabled) and even
// excludes `.js` from its default transform filter. Worse, the dev/test path
// (`vite:oxc`) and the production bundle path (rolldown's `builtin:vite-transform`)
// resolve a file's language from its EXTENSION, so simply tweaking `oxc.include`
// or `oxc.jsx` does not enable JSX parsing for `.js` in the bundled build.
//
// The robust, general fix is an `enforce: 'pre'` plugin that runs Vite's OWN Oxc
// transformer over every `src/**/*.js` file with `lang: 'jsx'` and the React
// automatic runtime. This is a real JSX compiler (the supported `transformWithOxc`
// API), not a regex, so it handles arbitrary JSX in any `.js` file. Running at
// `pre` means downstream transforms (the built-in Oxc/rolldown transform and
// `@vitejs/plugin-react`) only ever see already-compiled plain JS, which keeps
// behaviour identical across dev, `vite build`, and the Vitest environment.
function jsxInJs() {
  const filter = /\.js$/
  return {
    name: 'jsx-in-js',
    enforce: 'pre',
    async transform(code, id) {
      const [filepath] = id.split('?')
      if (!filter.test(filepath) || filepath.includes('node_modules')) return null
      const result = await transformWithOxc(code, id, {
        lang: 'jsx',
        jsx: { runtime: 'automatic' },
      })
      return { code: result.code, map: result.map }
    },
  }
}

export default defineConfig({
  plugins: [jsxInJs(), react({ include: /\.(js|jsx)$/ })],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    globals: true,
  },
  build: {
    outDir: 'build',
    minify: false,
  },
})
