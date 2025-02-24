import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { nodePolyfills } from 'vite-plugin-node-polyfills'


export default defineConfig({
  plugins: [nodePolyfills(), react()],
  resolve: {
    alias: {
      src: "/src",
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5173',
        changeOrigin: true,
      },
    },
  }
})
