import { onBeforeMount, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
import { useSignIn } from "vue-use-firebase"
import { useAuthStore } from "@stores/authStore"
import { useToaster } from "@stores/toasterStore"

import axios from "axios"

const AUTH_KEY = "auth-id"

export function useAuth() {
    const { actions } = useAuthStore()
    const { sendVerificationCode, signInPhoneNumber } = useSignIn()
    const { push: navigate } = useRouter()
    const { actions: { notify } } = useToaster()

    const state = reactive({
        phone: "",
        code: "",

        showVerification: false,
        isLoading: false,
    })

    onBeforeMount(function () {
        state.showVerification = typeof localStorage.getItem(AUTH_KEY) === "string"
    })

    async function sendCode() {
        state.isLoading = true
        
        try {
            const phone = "+57" + state.phone

            // find user

            const res = await axios.get(`/auth/phone/${phone}`)

            if (res.data.error || res.data.message) {
                throw new Error(res.data.message)
            }

            // send code

            else {
                const id = await sendVerificationCode("+57" + state.phone)

                localStorage.setItem(AUTH_KEY, id)
                state.showVerification = true

                await navigate({ name: "verify-code" })
            }
        }

        catch (err) {
            if (err.code) {
                switch (err.code) {
                    case "auth/too-many-requests": {
                        notify("demasiados intentos, por favor intente mas tarde", true)
                        break
                    }

                    default: {
                        notify("intenta mas tarde", true)
                        break
                    }
                }
            }

            else {
                notify(err.message, true)
            }

            console.error(err)
        }

        finally {
            state.isLoading = false
        }
    }

    async function verifyCode() {
        state.isLoading = true
        
        try {
            const id = localStorage.getItem(AUTH_KEY)

            await signInPhoneNumber(id, state.code)
            localStorage.removeItem(AUTH_KEY)

            await actions.fetchUser()
            await navigate({ name: "home" })
        }

        catch (err) {
            if (err.code) {
                // catch a firebase error

                switch (err.code) {
                    case "auth/invalid-verification-code": {
                        notify("código incorrecto", true)
                        break
                    }

                    default: {
                        notify("el código ha expirado, intenta enviar otro", true)

                        localStorage.removeItem(AUTH_KEY)
                        await navigate("/sign")
                    }
                }

            }

            else {
                notify(err.message, true)
            }

            console.error(err)
        }

        finally {
            state.isLoading = false
        }
    }

    return {
        ...toRefs(state),

        sendCode,
        verifyCode,
    }
}