import react from "@vitejs/plugin-react"
import { nodePolyfills } from "vite-plugin-node-polyfills"
import { defineConfig, loadEnv } from "vite"
import checker from "vite-plugin-checker"
import { createHtmlPlugin } from "vite-plugin-html"
import tsconfigPaths from "vite-tsconfig-paths"
import * as pack from "./package.json"
import basicSsl from "@vitejs/plugin-basic-ssl"

function renderChunks(deps) {
  const chunks = {}
  for (const key of Object.keys(deps)) {
    if (["react", "react-router-dom", "react-dom"].includes(key)) {
      continue
    }

    chunks[key] = [key]
  }

  return chunks
}

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, "env")

  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: [
              'react',
              'react-router-dom',
              'react-dom',
            ],
            ...renderChunks(pack.dependencies),
          },
        },
      },
      sourcemap: false
    },
    optimizeDeps: {
      esbuildOptions: {
        target: "esnext",
      }
    },
    plugins: [
      nodePolyfills({
        // To exclude specific polyfills, add them to this list.
        exclude: [
          "fs" // Excludes the polyfill for `fs` and `node:fs`.
        ],
        // Whether to polyfill specific globals.
        globals: {
          Buffer: true, // can also be 'build', 'dev', or false
          global: true,
          process: true,
        },
        // Whether to polyfill `node:` protocol imports.
        protocolImports: true
      }),
      basicSsl(),
      react({
        include: ["**/*.tsx", "**/*.ts"]
      }),
      tsconfigPaths(),
      createHtmlPlugin({
        inject: {
          data: {
            ...environment,
            MODE: mode
          }
        },
        minify: true
      }),
      checker({
        typescript: true
      })
    ],
    server: {
      hmr: true,
      // headers: {
      //   "Cross-Origin-Opener-Policy": "unsafe-none",
      //   "x-apikey": "55be224f"
      // }
    },
    preview: {
      // headers: {
      //   "Cross-Origin-Opener-Policy": "unsafe-none",
      //   "x-apikey": "55be224f"
      // }
    }
  }
})
