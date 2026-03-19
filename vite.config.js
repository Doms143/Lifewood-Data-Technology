import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          if (id.includes('three')) return 'vendor-three'
          if (id.includes('leaflet') || id.includes('react-leaflet')) return 'vendor-maps'
          if (id.includes('framer-motion')) return 'vendor-motion'
          if (id.includes('lucide-react')) return 'vendor-icons'
          if (id.includes('@supabase') || id.includes('@emailjs')) return 'vendor-services'

          return 'vendor'
        },
      },
    },
  },
})
