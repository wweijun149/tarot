import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // 允許 Vite 存取上層的 pkg 目錄
      allow: ['..'],
    },
  },
  optimizeDeps: {
    // 排除 wasm 套件的預構建，讓 Vite 直接處理 ESM+Wasm
    exclude: ['tarot-engine'],
  },
  // 確保 .wasm 檔案以正確的 MIME type 提供
  assetsInclude: ['**/*.wasm'],
})
