<template>
    <div class="dropdown">
        <div class="profile--image">
            <img src="https://img.icons8.com/color/144/000000/user-male-circle--v1.png">
        </div>

        <div class="dropdown-list">
            <router-link to="/" class="dropdown-item">Inicio</router-link>
            <a class="dropdown-item">Cuenta</a>

            <hr>

            <a class="dropdown-item color-red" @click="logOut">Cerrar sesión</a>
        </div>
    </div>
</template>

<style lang="scss">
.profile--image {
    cursor: pointer;

    img {
        max-height: 2.6rem;
    }
}
</style>

<script lang="ts">
import { useAuthStore } from "@stores/authStore"
import { useRouter } from "vue-router"
import { computed, defineComponent, toRef } from "vue"

export default defineComponent({
    setup() {
        const { state, actions } = useAuthStore()

        const user = toRef(state, "user")

        const { push: navigate } = useRouter()

        async function logOut() {
            await actions.signOut()
            await navigate({ name: "sign-in" })
        }

        return { user, logOut }
    }
})
</script>