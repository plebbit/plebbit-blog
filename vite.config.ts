import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  base: process.env.PUBLIC_URL || '/',
  plugins: [
    react(),
    nodePolyfills({
      // Enable all polyfills needed by plebbit-react-hooks
      include: ['buffer', 'process', 'stream', 'crypto', 'util', 'events', 'path', 'os', 'assert', 'url', 'string_decoder'],
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // Use the polyfill implementation for all node modules
      overrides: {
        fs: 'memfs',
      },
    }),
  ],
  build: {
    outDir: 'build',
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
  },
  preview: {
    port: 3000,
  },
  // Optimize deps to pre-bundle problematic modules
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  resolve: {
    alias: {
      // Ensure stream uses the browserified version
      stream: 'stream-browserify',
    },
  },
});
