import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@graficos': path.resolve(__dirname, './src/component/graficos/'),
      '@admin': path.resolve(__dirname, './src/component/admin/'),
      '@services': path.resolve(__dirname, './src/services/'),
      '@component': path.resolve(__dirname, './src/component/'),
      '@pages': path.resolve(__dirname, './src/pages/'),
      '@styles': path.resolve(__dirname, './src/styles/'),
    },
  }
});
