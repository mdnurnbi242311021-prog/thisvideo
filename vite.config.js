import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        portal: resolve(__dirname, 'portal.html'),
        doctor: resolve(__dirname, 'doctor.html'),
        diagnostic: resolve(__dirname, 'diagnostic.html'),
        hospital: resolve(__dirname, 'hospital.html'),
        pharmacy: resolve(__dirname, 'pharmacy.html'),
        blood: resolve(__dirname, 'blood.html'),
        admin: resolve(__dirname, 'admin.html'),
        privacy: resolve(__dirname, 'privacy.html')
      }
    }
  }
});
