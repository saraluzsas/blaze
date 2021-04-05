<template>
    <div class="camera--modal modal is-open">
        <div class="modal-body">

            <div class="wrapper">
                <button class="is-primary">
                    <span>Capturar y guardar</span>
                </button>

                <button @click="close">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    setup(props, { emit }) {
        const close = () => emit("close")

        return {
            close
        }
    }
})
</script>