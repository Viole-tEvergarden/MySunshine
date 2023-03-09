import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from "unplugin-auto-import/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports:[ 'vue','pinia','vue-router']
    })
  ],
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
