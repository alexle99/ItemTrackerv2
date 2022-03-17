import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base:"/ItemTrackerv2/",
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
});

// export default defineConfig({
//   base:"ItemTrackerv2",
//   plugins: [react()],
//   resolve: { alias: { '@': path.resolve(__dirname, 'src') } },
// });
