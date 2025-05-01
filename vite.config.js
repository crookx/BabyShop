import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc'
    },
  },
  optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material'],
    exclude: ['@mui/material/styles']
  }
});