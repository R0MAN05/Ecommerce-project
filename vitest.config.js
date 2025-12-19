// Export an async config factory that loads @vitejs/plugin-react only if it's available.
// This prevents the config from failing when running tests from the repository root
// where the plugin may not be installed.
export default async () => {
  let reactPlugin = null;
  try {
    const mod = await import('@vitejs/plugin-react').catch(() => null);
    reactPlugin = mod?.default ?? mod;
  } catch (e) {
    reactPlugin = null;
  }

  // Return the config object
  return {
    plugins: reactPlugin ? [reactPlugin()] : [],
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './setupTests.js',
    }
  };
};