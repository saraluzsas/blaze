<template>
    <div class="toaster grid-1 gap-sm">
        <div
            class="padding-xs rounded background shadow-md"
            v-for="(toast, index) in toasts"
            :class="toast.error ? 'background-red' : 'background-green'"
            :key="index">

            <p class="text-firstcase color-white">{{ toast.text }}</p>
        </div>
    </div>
</template>

<style lang="scss">
.toaster {
    position: fixed;
    left: 50%;
    bottom: 1rem;
    transform: translateX(-50%);
    margin-bottom: 2rem;
}
</style>

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