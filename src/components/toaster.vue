<template>
    <div class="toaster xs-1 gap-sm">
        <div
            class="border padding radius"
            v-for="(toast, index) in toasts"
            :key="index">

            <p class="text-firstcase">{{ toast.title }}</p>
            <small v-if="toast.subtitle" :class="`text-${toast.color}`">{{ toast.subtitle.text }}</small>
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