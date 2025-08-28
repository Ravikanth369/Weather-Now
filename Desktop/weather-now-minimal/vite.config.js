import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // allows access from external hosts
    port: 5173,        // default Vite port
    strictPort: true,  // avoids random port switching
  },
  preview: {
    host: true,
    port: 5173,
  },
});
