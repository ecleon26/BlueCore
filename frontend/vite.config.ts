import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  server: {
    host: 'localhost',
    port: 5173,
  },
  publicDir: 'public',
})
