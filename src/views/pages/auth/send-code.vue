<template>
    <h2>Iniciar sesión</h2>

    <p>Ingresa tu número de teléfono para continuar.</p>

    <form @submit.prevent="sendCode">
        <div class="field">
            <label for="phone">Número de teléfono</label>
            <div class="grouper">
                <div class="button is-static">+57</div>

                <input
                    id="phone"
                    type="tel"
                    v-model="phone"
                    class="input is-spread"
                    placeholder="300 0000 000"
                    autocomplete="off"
                    minlength="10"
                    maxlength="10"
                    required>
            </div>
        </div>

        <small>Protegido por reCAPTCHA de <a href="https://policies.google.com/terms?hl=es" target="_blank" rel="noopener">Google</a>.</small>

        <div class="wrapper">
            <button
                type="submit"
                class="is-primary is-spread"
                :class="{ 'has-loader': isLoading }"
                :disabled="isLoading">

                <span>Continuar</span>
            </button>
        </div>
    </form>

    <div id="recaptcha--container"></div>
</template>

<style lang="scss">
#recaptcha--container {
    visibility: hidden;
}
</style>

<script lang="ts">
import { useSignIn } from "vue-use-firebase"
import { defineComponent, onMounted } from "vue"
import { useAuth } from "./useAuth"

export default defineComponent({
    setup() {
        const { setupRecaptcha } = useSignIn()
        const { phone, isLoading, sendCode } = useAuth()

        onMounted(async function () {
            await setupRecaptcha("recaptcha--container", { size: "invisible" })
        })

        return { phone, isLoading, sendCode }
    }
})
</script>