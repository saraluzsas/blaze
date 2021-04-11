<template>
    <div class="border radius">
        <div class="background-light border-bottom padding flex-spaced" v-if="canRemove">
            <p class="text-xs">Consignación <span class="color-primary">{{ data.date }}</span></p>
            <feather-icon name="x" class="cursor-pointer" @click="remove"></feather-icon>
        </div>

        <div class="xs-1 md-2 gap-sm padding">
            <input
                type="date"
                v-model="data.date"
                placeholder="Fecha"
                class="input is-spread">

            <input
                type="text"
                v-model="data.amount"
                class="input is-spread"
                placeholder="$ 0">
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true
        },

        canRemove: {
            type: Boolean,
            default: true
        }
    },

    setup(props, { emit }) {
        const remove = () => emit("remove")

        return {
            remove
        }
    }
})
</script>