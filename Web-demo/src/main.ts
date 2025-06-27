import { createApp } from "vue";
import ElementPlus from "element-plus";
import * as ElIconModules from  "@element-plus/icons-vue";
import router from "@/router/index";
// import "@/router/permission";

import pinia from "@/store/index";

import permission from "@/hooks/permission";

import "element-plus/dist/index.css";
import 'normalize.css/normalize.css';
import "./style.css";
import './style/font.css'
import '@/style/main.scss'
import App from "./App.vue";

const app = createApp(App);

for(let iconName in ElIconModules){ 
    if (Reflect.has(ElIconModules, iconName)) {
        app.component(iconName,  ElIconModules[iconName as keyof typeof ElIconModules])
    }
}
app.directive("permission", permission);

app.use(ElementPlus).use(router).use(pinia).mount("#app");
