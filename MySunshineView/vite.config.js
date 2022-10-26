import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // vite 路径别名配置
    alias: {
      '@': path.resolve('./src'), // 使用 @ 替换 ./src
    },
    css: {
      // 定义全局 scss 文件路径
      additionalData: `@import "@/assets/common/mixin.scss";`
    }
  }
})
