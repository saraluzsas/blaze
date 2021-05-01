<template>
    <div class="border rounded">
        <div class="background-light border-bottom padding-sm padding-vertical-xs flex-spaced">
            <p class="text-xs">Consignación <span class="color-primary">{{ data.date }}</span></p>
            <feather-icon name="x" class="cursor-pointer" v-if="canRemove" @click="$emit('remove')"></feather-icon>
        </div>

        <div class="grid-1 grid-md-2 gap-sm padding">
            <input
                type="date"
                v-model="data.date"
                placeholder="Fecha"
                class="input is-spread">

            <currency-input v-model="data.amount"></currency-input>
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
    }
})
</script>