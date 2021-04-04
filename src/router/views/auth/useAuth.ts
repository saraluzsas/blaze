import { onBeforeMount, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"
import { useSignIn } from "vue-use-firebase"

const AUTH_KEY = "auth-id"

export function useAuth() {
    const { sendVerificationCode, signInPhoneNumber } = useSignIn()
    const { push: navigate } = useRouter()

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
            const id = await sendVerificationCode("+57" + state.phone)

            localStorage.setItem(AUTH_KEY, id)
            state.showVerification = true

            await navigate({ name: "verify-code" })
        }

        catch (err) {
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
            await navigate({ name: "home" })
            
            localStorage.removeItem(AUTH_KEY)
        }

        catch (err) {
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