import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

import { execSync } from 'child_process'

const commitHash = execSync('git rev-parse HEAD').toString().trim()

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const launchEditor = env.LAUNCH_EDITOR || process.env.LAUNCH_EDITOR

  return {
    base: './',
    plugins: [
      vue(),
      vueDevTools({
        launchEditor: launchEditor,
      }),
    ],
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
      __GIT_COMMIT_HASH__: JSON.stringify(commitHash),
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
