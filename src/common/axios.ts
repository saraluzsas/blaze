import axios from "axios"

import firebase from "firebase/app"
import "firebase/auth"

axios.interceptors.request.use(req => {
    req.baseURL = import.meta.env.VITE_API_URL

    return req
})

axios.interceptors.request.use(
    async req => {
        const auth = firebase.auth()

        if (auth.currentUser) {
            const token = await auth.currentUser.getIdToken()
            req.headers["authorization"] = `Bearer ${token}`
        }

        return req
    }
)