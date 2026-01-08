import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// Plugin to transform HTML asset paths to respect base URL
function transformHtmlBaseUrl() {
  return {
    name: 'transform-html-base-url',
    transformIndexHtml(html: string) {
      const base = process.env.PUBLIC_URL || '/';
      // Replace absolute paths (href="/...", src="/...") with base-relative paths
      // Exclude /src/ paths as Vite handles those automatically
      return html
        .replace(/href="\/(?!src\/)([^"]+)"/g, `href="${base}$1"`)
        .replace(/src="\/(?!src\/)([^"]+)"/g, `src="${base}$1"`);
    },
  };
}

export default defineConfig({
  base: process.env.PUBLIC_URL || '/',
  plugins: [
    react(),
    transformHtmlBaseUrl(),
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
