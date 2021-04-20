<template>
    <div class="consignment--item flex-spaced border rounded padding-sm cursor-pointer" @click="show = true">
        <div class="wrapper align-center">
            <img src="https://img.icons8.com/color/96/000000/cash-.png">
        
            <div>
                <p class="text-capcase">{{ data.author }}</p>
                <small class="text-firstcase">{{ toCurrency(data.total) }}</small>
            </div>
        </div>
    </div>

    <teleport to="#app">
        <div class="fixed-backdrop flex-centered" v-if="show">
            <feather-icon
                name="x"
                size="2rem"
                @click="show = false"
                class="margin-md fixed-top fixed-right color-white cursor-pointer">
            </feather-icon>

            <div class="modal-bg padding-md">
                <div class="grid-1 grid-2-md gap-md">
                    <div class="container container--image">
                        <img :src="image" :alt="data._key" class="rounded-md shadow">

                        <div class="container gap-md padding-sm">
                            <p class="color-primary text-capcase">{{ data.author }}</p>

                            <div class="grid-1 grid-2-md gap-md">
                                <div class="container">
                                    <small>FECHA</small>
                                    <p class="text-firstcase">{{ toTimeAgo(data.createdAt) }}</p>
                                </div>

                                <div class="container">
                                    <small>TOTAL</small>
                                    <p>{{ toCurrency(data.total) }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="container gap-md">
                        <small>DETALLES</small>

                        <div class="organizer container--details">
                            <div
                                class="border rounded padding-sm"
                                v-for="(detail, key) in data.details"
                                :key="key">

                                <small class="text-firstcase">{{ toTimeAgo(detail.date) }}</small>
                                <p>{{ toCurrency(detail.amount) }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

<style lang="scss" scoped>
.consignment--item {
    img {
        height: 3rem;
    }
}

.fixed-backdrop {
    .container--image {
        img {
            width: 100%;
        }
    }
}
</style>

<script lang="ts">
import { getPhotoURL } from "@useCases/consignment"
import { computed, defineComponent, reactive, toRefs } from "vue"
import { toCurrency, toTimeAgo } from "@services/formatter"

export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true,
        }
    },

    setup(props) {
        const state = reactive({
            show: false,
            image: getPhotoURL(props.data?._key),
        })

        return {
            ...toRefs(state),

            toCurrency,
            toTimeAgo,
        }
    }
})
</script>