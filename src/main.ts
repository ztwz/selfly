import { createSSRApp } from 'vue'
import App from './App.vue'
import 'uno.css'
import '@/styles/index.scss' // 导入全局样式
import 'core-js/actual/array/iterator'
import 'core-js/actual/promise'
import 'core-js/actual/object/assign'
import 'core-js/actual/promise/finally'

export function createApp() {
  const app = createSSRApp(App)
  return {
    app,
  }
}
