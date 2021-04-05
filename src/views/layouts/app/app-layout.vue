<template>
    <main class="dashboard">
        <app-sidebar></app-sidebar>

        <div class="container">
            <router-view></router-view>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import AppSidebar from "./app-sidebar.vue"

export default defineComponent({
    components: {
        AppSidebar
    }
})
</script>