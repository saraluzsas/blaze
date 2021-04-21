<template>
    <div class="fixed-backdrop flex-centered layer-xl" @keypress.esc="$emit('close')" tabindex="0">
        <feather-icon
            name="x"
            size="2rem"
            @click="$emit('close')"
            class="margin-md fixed-top fixed-right color-white cursor-pointer">
        </feather-icon>

        <div class="modal-bg padding-md">
            <div class="flex align-start gap-md">
                <div class="container width-spread sticky-top container--image">
                    <a :href="image" class="cursor-zoomin">
                        <img
                            :src="image"
                            :alt="title"
                            loading="lazy"
                            class="width-spread rounded-md shadow">
                    </a>

                    <div class="container gap-md padding-sm">
                        <p class="color-primary text-capcase">{{ author }}</p>

                        <div class="grid-1 grid-2-md gap-md">
                            <div class="container">
                                <small>FECHA</small>
                                <p class="text-firstcase">{{ toTimeAgo(createdAt) }}</p>
                            </div>

                            <div class="container">
                                <small>TOTAL</small>
                                <p>{{ toCurrency(total) }}</p>
                            </div>
                        </div>

                        <button class="is-red is-spread" @click="$emit('remove')">
                            <span>Eliminar</span>
                        </button>
                    </div>
                </div>

                <div class="container width-spread gap-md">
                    <small>DETALLES</small>

                    <div class="organizer container--details">
                        <div
                            class="border rounded padding-sm"
                            v-for="(detail, key) in details"
                            :key="key">

                            <small class="text-firstcase">{{ toTimeAgo(detail.date) }}</small>
                            <p>{{ toCurrency(detail.amount) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { toCurrency, toTimeAgo } from "@services/formatter"
import { defineComponent, onBeforeUnmount, PropType } from "vue"

interface Detail { id: number, amount: string, date: string }

export default defineComponent({
    inheritAttrs: false,

    props: {
        image: String,
        title: String,
        author: String,
        createdAt: String,
        total: [String, Number],
        details: Object as PropType<Detail[]>,
    },

    setup(props, { emit }) {
        function closeModal(event: KeyboardEvent) {
            if (event.key === "Escape") emit("close")
        }

        document.addEventListener("keydown", closeModal)

        onBeforeUnmount(function () {
            document.removeEventListener("keydown", closeModal)
        })

        return {
            toCurrency,
            toTimeAgo,
        }
    }
})
</script>