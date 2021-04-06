<template>
    <div class="toaster">
        <div
            class="toaster-item"
            v-for="(toast, index) in toasts"
            :key="index">

            <p>{{ toast.title }}</p>
            <small v-if="toast.subtitle" :class="`text-${toast.color}`">{{ toast.subtitle.text }}</small>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from "vue"
import { useToaster } from "@stores/toasterStore"

export default defineComponent({
    setup() {
        const { state } = useToaster()

        return { ...toRefs(state) }
    }
})
</script>