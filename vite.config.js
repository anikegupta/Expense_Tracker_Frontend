import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import flowbiteReact from "flowbite-react/plugin/vite"
// https://vite.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'https://expense-tracker-4-ov1b.onrender.com/api',
    },
  },
  plugins: [react(),tailwindcss(),flowbiteReact()],
})
