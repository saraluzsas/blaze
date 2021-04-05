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
                    const { data } = await axios.get("/user/me")
                    state.user = data.data
                }
    
                catch (err) {
                    console.error(err)
                }
            }
        },

        async signOut(state) {
            state.user = undefined
            await signOut()
        },
    },

    plugins: [
        createPersistence()
    ]
})