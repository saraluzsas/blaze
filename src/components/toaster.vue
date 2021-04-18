<template>
    <div class="toaster grid-1 gap-sm">
        <div
            class="border padding radius background shadow-md"
            v-for="(toast, index) in toasts"
            :key="index">

            <p class="text-firstcase" :class="{ 'color-red': toast.error }">{{ toast.text }}</p>
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