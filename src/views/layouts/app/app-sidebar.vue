<template>
    <div class="sidebar">
        <div class="sidebar-menu">
            <app-profile></app-profile>

            <a class="sidebar-item">
                <feather-icon name="shuffle"></feather-icon>
                <span>Cruces</span>
            </a>

            <a class="sidebar-item">
                <feather-icon name="users"></feather-icon>
                <span>Usuarios</span>
            </a>

            <router-link :to="{ name: 'store' }" class="sidebar-item">
                <feather-icon name="shopping-bag"></feather-icon>
                <span>Tienda</span>
            </router-link>

            <hr>

            <a class="sidebar-item">
                <feather-icon name="settings"></feather-icon>
                <span>Configuración</span>
            </a>

            <a class="sidebar-item text-error" @click="logOut">
                <feather-icon name="log-out"></feather-icon>
                <span>Cerrar sesión</span>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { signOut } from "vue-use-firebase"
import { useRouter } from "vue-router"

import AppProfile from "./app-profile.vue"

export default defineComponent({
    components: {
        AppProfile
    },

    setup() {
        const { push: navigate } = useRouter()

        async function logOut() {
            await signOut()
            await navigate({ name: "send-code" })
        }

        return { logOut }
    }
})
</script>