import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Custom plugin: pre-transform JSX syntax in .js files before the OXC
// transformer runs. This is needed because Vitest 4 + Vite 8 (rolldown/oxc)
// strips JSX settings from the oxc config for the test environment, causing
// a parse error on `levels.js` which contains a JSX expression in its data.
// The transform replaces JSX with equivalent React.createElement calls so the
// module can be imported in tests without changing the source file.
function jsxInJsPlugin() {
  return {
    name: 'jsx-in-js',
    enforce: 'pre',
    transform(code, id) {
      // Only handle .js files (not .jsx) that appear to contain JSX
      if (!id.endsWith('.js') || id.includes('node_modules')) return null
      if (!code.includes('<') || !/<[A-Za-z][^>]*>/.test(code)) return null

      // Use a targeted replacement for the known JSX pattern in levels.js:
      // Replace: <center><img src="..." alt="..." /></center>
      // With:    React.createElement("center", null, React.createElement("img", { src: "...", alt: "..." }))
      let transformed = code
      transformed = transformed.replace(
        /<center><img\s+src="([^"]*)"\s+alt="([^"]*)"\s*\/><\/center>/g,
        (_, src, alt) =>
          `React.createElement("center", null, React.createElement("img", { src: "${src}", alt: "${alt}" }))`
      )

      if (transformed === code) return null

      // Add React import if not already present (needed for React.createElement)
      if (!transformed.includes('import React') && !transformed.includes('require("react")') && !transformed.includes("require('react')")) {
        transformed = `import React from 'react';\n` + transformed
      }

      return { code: transformed, map: null }
    },
  }
}

export default defineConfig({
  plugins: [jsxInJsPlugin(), react({ include: /\.(js|jsx)$/ })],
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
