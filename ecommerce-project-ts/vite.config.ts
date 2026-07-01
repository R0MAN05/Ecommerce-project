import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      axios: 'axios/dist/browser/axios.cjs'
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }, 
        '/images': {
          target: 'http://localhost:3000'
      } 
    }
  }
})
