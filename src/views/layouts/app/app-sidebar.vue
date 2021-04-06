<template>
    <div class="sidebar">
        <div class="sidebar-menu">
            <app-profile></app-profile>

            <authorized roles="developer, auditor">
                <router-link :to="{ name: 'user-list' }" class="sidebar-item">
                    <feather-icon name="users"></feather-icon>
                    <span>Usuarios</span>
                </router-link>
            </authorized>

            <authorized roles="auditor">
                <a class="sidebar-item">
                    <feather-icon name="shuffle"></feather-icon>
                    <span>Cruces</span>
                </a>
            </authorized>

            <authorized roles="store">
                <router-link :to="{ name: 'store' }" class="sidebar-item">
                    <feather-icon name="shopping-bag"></feather-icon>
                    <span>Tienda</span>
                </router-link>
            </authorized>

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
import { useAuthStore } from "@stores/authStore"
import { useRouter } from "vue-router"

import AppProfile from "./app-profile.vue"
import Authorized from "@components/authorized-view.vue"

export default defineComponent({
    components: {
        AppProfile,
        Authorized,
    },

    setup() {
        const { actions } = useAuthStore()
        const { push: navigate } = useRouter()

        async function logOut() {
            await actions.signOut()
            await navigate({ name: "sign-in" })
        }

        return { logOut }
    }
})
</script>