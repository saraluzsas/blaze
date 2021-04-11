import "./styles/style.scss"

// firebase

import "./services/firebase"
import "./services/axios"

// vue

import { createApp } from "vue"
import { router } from "./views/router"

import App from "./app.vue"

const app = createApp(App)

app.use(router)

app.mount("#app")