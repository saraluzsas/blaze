import { useToaster } from "@stores/toasterStore"
import axios from "axios"

import firebase from "firebase/app"
import "firebase/auth"

axios.defaults.validateStatus = status => true

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

axios.interceptors.response.use(res => {
    if (res.data["message"]) {
        const { actions } = useToaster()

        actions.add(res.data["message"])
    }

    return res
})

axios.interceptors.response.use(res => {
    if (res.data["data"]) res.data = res.data["data"]
    return res
})