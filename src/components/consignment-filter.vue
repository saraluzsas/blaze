<template>
    <div class="fixed-backdrop">
        <div class="slider">
            <div class="content height-spread">
                <div class="flex-column gap-md">
                    <div class="xs-1 md-2 gap-md">
                        <div class="container">
                            <label for="from">Desde</label>

                            <input
                                type="date"
                                id="from"
                                class="input is-spread"
                                v-model="filters.from">
                        </div>

                        <div class="container">
                            <label for="to">Hasta</label>

                            <input
                                type="date"
                                id="to"
                                class="input is-spread"
                                v-model="filters.to"
                                required>
                        </div>
                    </div>
                </div>
            </div>

            <div class="wrapper padding-md background-light border-top">
                <button class="is-primary">Aplicar filtros</button>
                <button>Cancelar</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        filters: {
            type: Object,
            required: true,
        }
    }
})
</script>