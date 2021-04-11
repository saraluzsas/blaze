import { createPersistence, createStore } from "nuxel"
import { signOut } from "vue-use-firebase"

import axios from "axios"

export const useAuthStore = createStore({
    id: "auth",

    state: {
        user: undefined
    },

    actions: {
        async fetchUser(state) {
            if (state.user === undefined) {
                try {
                    const { data } = await axios.get("/auth/me")
                    state.user = data
                }
    
                catch (err) {
                    console.error(err)
                    alert("Error: " + err.message)
                }
            }
        },

        async signOut(state) {
            await signOut()

            state.user = undefined
        },
    },

    plugins: [
        createPersistence()
    ]
})