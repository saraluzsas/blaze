<template>
    <div class="box wrapper">
        <input
            type="date"
            v-model="detail.date"
            class="input">

        <input
            type="text"
            v-model="detail.amount"
            class="input is-spread"
            placeholder="$ 0">

        <button class="is-outline" v-if="canRemove" @click="remove">
            <feather-icon name="trash-2"></feather-icon>
        </button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        detail: {
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