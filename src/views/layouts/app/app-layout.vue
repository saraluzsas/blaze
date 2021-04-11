<template>
    <main>
        <app-navbar @toggle="showNavbar = true"></app-navbar>
        <router-view></router-view>
    </main>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"

import AppNavbar from "./app-navbar.vue"

export default defineComponent({
    components: {
        AppNavbar,
    },

    setup() {
        const showNavbar = ref(false)

        return { showNavbar }
    }
})
</script>