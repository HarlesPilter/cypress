import { defineConfig } from 'cypress'
import getenv from 'getenv'
import { devServer } from '@cypress/vite-dev-server'

const CYPRESS_INTERNAL_CLOUD_ENV = getenv('CYPRESS_INTERNAL_CLOUD_ENV', process.env.CYPRESS_INTERNAL_ENV || 'development')

export default defineConfig({
  projectId: CYPRESS_INTERNAL_CLOUD_ENV === 'staging' ? 'ypt4pf' : 'sehy69',
  viewportWidth: 800,
  viewportHeight: 850,
  retries: {
    runMode: 2,
    openMode: 0,
  },

  testFiles: '**/*.{spec,cy}.{js,ts,tsx,jsx}',
  reporter: '../../node_modules/cypress-multi-reporters/index.js',
  reporterOptions: {
    configFile: '../../mocha-reporter-config.json',
  },
  integrationFolder: 'cypress/e2e/integration',
  componentFolder: 'src',
  supportFile: false,
  experimentalInteractiveRunEvents: true,
  component: {
    testFiles: '**/*.{spec,cy}.{js,ts,tsx,jsx}',
    supportFile: 'cypress/component/support/index.ts',
    devServer,
    devServerConfig: {
      optimizeDeps: {
        include: [
          '@headlessui/vue',
          'vue3-file-selector',
          'just-my-luck',
          'combine-properties',
          'faker',
          '@packages/ui-components/cypress/support/customPercyCommand',
        ],
      },
      build: {
        sourcemap: false,
      },
    },
  },
  e2e: {
    pluginsFile: 'cypress/e2e/plugins/index.ts',
    supportFile: 'cypress/e2e/support/e2eSupport.ts',
    async setupNodeEvents (on, config) {
      const { e2ePluginSetup } = require('@packages/frontend-shared/cypress/e2e/e2ePluginSetup')

      return await e2ePluginSetup(on, config)
    },
  },
})
