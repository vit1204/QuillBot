import { createApp } from 'vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Root from './Root.vue'
import router from './router'
import './assets/main.scss'

const app = createApp(Root)
app.use(router)
for (const [key, component] of Object.entries(ElementPlusIconsVue))
  app.component(key, component)

router.isReady().then(() => {
  app.mount('#root')
})
