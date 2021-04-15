import firebase from "firebase/app"
import "firebase/auth"

firebase.initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_SENDER,
    appId: import.meta.env.VITE_FIREBASE_APP,
    measurementId: import.meta.env.VITE_FIREBASE_MEASURE
})