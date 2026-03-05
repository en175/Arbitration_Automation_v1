import { createApp } from 'vue'
import './style.css'
import './styles/design-tokens.css'
import './styles/workbench.css'
import './styles/arbitration-kit.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
