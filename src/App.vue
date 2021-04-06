<template>
    <router-view></router-view>
    <toaster></toaster>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import Toaster from "@components/toaster.vue"

export default defineComponent({
    components: {
        Toaster
    }
})
</script>