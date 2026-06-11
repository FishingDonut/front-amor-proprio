import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/public/api': {
        target: 'https://amorproprio.free.nf',
        changeOrigin: true,
        secure: false,
        headers: {
          'Origin': 'https://amorproprio.free.nf',
          'Referer': 'https://amorproprio.free.nf/',
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
        }
      }
    }
  }
})
