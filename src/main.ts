import "./styles/style.scss"

// firebase

import firebase from "firebase/app"
import "firebase/auth"

firebase.initializeApp({
    apiKey: "AIzaSyDW0h2CL1j2Bx2aMP12xfEH2iHj_7NBjJo",
    authDomain: "nautilus-dev-60876.firebaseapp.com",
    projectId: "nautilus-dev-60876",
    storageBucket: "nautilus-dev-60876.appspot.com",
    messagingSenderId: "886946351458",
    appId: "1:886946351458:web:f19ad3b80bcd7fd607043b",
    measurementId: "G-N8Z82ZQLT8"
})

// axios

import "./common/axios"

// vue

import { createApp } from "vue"
import { router } from "./views/router"

import App from "./App.vue"

const app = createApp(App)

app.use(router)

app.mount("#app")