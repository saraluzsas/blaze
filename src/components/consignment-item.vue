<template>
    <div class="consignment--item flex-spaced border radius padding-sm cursor-pointer" @click="show = true">
        <div class="wrapper align-center">
            <img src="https://img.icons8.com/color/96/000000/cash-.png">
        
            <div>
                <p class="text-capcase">{{ data.author }}</p>
                <small class="text-firstcase">{{ toCurrency(data.total) }}</small>
            </div>
        </div>
    </div>

    <div class="fixed-backdrop flex-centered" v-if="show">
        <feather-icon
            name="x"
            size="2rem"
            @click="show = false">
        </feather-icon>

        <div class="modal-bg padding-sm">
            <div class="xs-1 md-2 gap-md">
                <div class="container container--image">
                    <img :src="image" :alt="data._key" class="radius-md shadow">

                    <div class="container gap-md padding-sm">
                        <p class="color-primary text-capcase">{{ data.author }}</p>

                        <div class="xs-1 md-2 gap-md">
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

                <div class="organizer container--details">
                    <div
                        class="border radius padding-sm"
                        v-for="(detail, key) in data.details"
                        :key="key">

                        <small class="text-firstcase">{{ toTimeAgo(detail.date) }}</small>
                        <p>{{ toCurrency(detail.amount) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.consignment--item {
    img {
        height: 3rem;
    }
}

.fixed-backdrop {
    feather-icon {
        cursor: pointer;
        position: absolute;
        top: 2rem;
        right: 2rem;
        color: white;
    }

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