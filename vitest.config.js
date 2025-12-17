import react from '@vitejs/plugin-react'

// Export a plain config object to avoid requiring `vitest` at the workspace root.
// Individual packages with Vitest installed will still pick up this config.
export default {
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './setupTests.js',
  }
};