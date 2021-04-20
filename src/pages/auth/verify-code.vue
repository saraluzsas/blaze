<template>
    <template class="container" v-if="show">
        <h3>Un paso más</h3>

        <p>Hemos enviado un mensaje de texto con un código de verificación de 6 digitos, escribelo a continuación.</p>

        <form @submit.prevent="verifyCode">
            <div class="container">
                <label for="code">Código de verificación</label>
                <input
                    id="code"
                    type="tel"
                    v-model="code"
                    class="input is-spread"
                    placeholder="000 000"
                    pattern="[0-9]{6}"
                    autocomplete="off"
                    minlength="6"
                    maxlength="6"
                    required>

                <small>El código puede demorar un tiempo.</small>
            </div>

            <div class="wrapper">
                <button
                    type="submit"
                    class="is-primary is-spread"
                    :disabled="isLoading"
                    :class="{ 'has-loader': isLoading }">

                    <span>Continuar</span>
                </button>
            </div>
        </form>
    </template>

    <template v-else>
        <h2>No deberias estar aquí</h2>

        <p>No hay ninguna solicitud para iniciar sesión. Regresa e ingresa tu número de teléfono para llegar aquí.</p>

        <div class="wrapper">
            <router-link :to="{ name: 'send-code' }" class="button is-outline is-spread">Regresar</router-link>
        </div>
    </template>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useAuth } from "./useAuth"

export default defineComponent({
    setup() {
        const { showVerification: show, code, isLoading, verifyCode } = useAuth()

        return { show, code, isLoading, verifyCode }
    }
})
</script>