import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from both IPv4 and IPv6
    port: 5173, // Ensure the port is set
  },
  base: '/', // Set the base path for the application
})
