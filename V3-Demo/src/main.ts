import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import ElementPlus from 'element-plus'
import * as ElIconModules from "@element-plus/icons-vue";
import "element-plus/dist/index.css";

import router from './router'
const app = createApp(App);
for (let iconName in ElIconModules) {
    if (Reflect.has(ElIconModules, iconName)) {
        app.component(iconName, ElIconModules[iconName as keyof typeof ElIconModules])
    }
}
app.use(ElementPlus).use(router).mount('#app')
