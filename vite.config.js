import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({mode}) => {
  // Load environment variables that start with VITE_
  const env = loadEnv(mode, process.cwd())

  // Map the VITE_* variables to keys without the prefix.
  const processEnv = Object.keys(env)
    .filter((key) => key.startsWith('VITE_'))
    .reduce((acc, key) => {
      // Remove the "VITE_" prefix and expose the variable
      const newKey = key.replace(/^VITE_/, '')
      acc[`process.env.${newKey}`] = JSON.stringify(env[key])
      return acc
    }, {})

  return {
    plugins: [react()],
    define: processEnv,
    server: {
      port: 3000,
    },
  }
})
