import "./styles/style.scss"

// firebase

import firebase from "firebase/app"

firebase.initializeApp({
    apiKey: "AIzaSyB6tjrOffG-Fn5Di6D57jrzipVBv6yTDq4",
    authDomain: "holigaru-dev.firebaseapp.com",
    projectId: "holigaru-dev",
    storageBucket: "holigaru-dev.appspot.com",
    messagingSenderId: "252420792985",
    appId: "1:252420792985:web:92d916e1c3a7b321e34e08",
    measurementId: "G-LMEQZ975RX"
})

// vue

import { createApp } from "vue"
import { router } from "./views/router"

import App from "./App.vue"

const app = createApp(App)

app.use(router)

app.mount("#app")