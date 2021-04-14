<template>
    <div class="navbar sticky-top">
        <div class="wrapper">
            <authorized-view roles="admin">
                <router-link to="/user" class="navbar-item">Usuarios</router-link>
                <router-link to="/consignment" class="navbar-item">Consignaciones</router-link>
            </authorized-view>

            <authorized-view roles="store">
                <router-link to="/consignment/new" class="navbar-item">Consignaciones</router-link>
            </authorized-view>
        </div>

        <app-profile></app-profile>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import AppProfile from "./app-profile.vue"

export default defineComponent({
    components: {
        AppProfile,
    },

    setup() {
        const show = ref(false)

        return { show }
    }
})
</script>