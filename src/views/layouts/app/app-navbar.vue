<template>
    <div class="navbar sticky-top">
        <div class="navbar-brand hide-bg">
            <a class="is-ghost" @click="show = !show">
                <feather-icon name="menu"></feather-icon>
            </a>
        </div>

        <div class="wrapper">
            <authorized roles="auditor, developer">
                <router-link to="/user" class="navbar-item">Usuarios</router-link>
            </authorized>

            <authorized roles="auditor">
                <a class="navbar-item">Cruces</a>
            </authorized>

            <authorized roles="store">
                <router-link to="/store" class="navbar-item">Tienda</router-link>
            </authorized>
        </div>

        <app-profile></app-profile>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import AppProfile from "./app-profile.vue"
import Authorized from "@components/authorized-view.vue"

export default defineComponent({
    components: {
        AppProfile,
        Authorized,
    },

    setup() {
        const show = ref(false)

        return { show }
    }
})
</script>