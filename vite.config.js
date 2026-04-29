import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: [
      'owner.eynomer.com',
      'controladm.eynomer.com',
      'yeladim-owner-admin-vi4mq.ondigitalocean.app',
    ],
  },
});
