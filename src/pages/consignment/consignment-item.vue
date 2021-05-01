<template>
    <div class="organizer">
        <div class="box flex-spaced align-center">
            <div class="wrapper align-center">
                <img class="height-xs" src="https://img.icons8.com/color/96/000000/banknotes.png">

                <div>
                    <p class="text-capcase">{{ data.author }}</p>
                    <small>{{ toCurrency(data.total) }}</small>
                </div>
            </div>

            <div class="wrapper gap-md">
                <a :href="image" target="_blank">
                    <feather-icon name="camera"></feather-icon>
                </a>

                <feather-icon
                    class="cursor-pointer"
                    name="chevron-down"
                    @click="show = !show">
                </feather-icon>
            </div>
        </div>

        <div class="border rounded" v-if="show">
            <div class="padding-sm">
                <div class="organizer">
                    <div
                        class="box gap-none padding-sm"
                        v-for="(detail, key) in data.details"
                        :key="key">

                        <small class="text-firstcase">{{ toTimeAgo(detail.date) }}</small>
                        <p>{{ toCurrency(detail.amount) }}</p>
                    </div>
                </div>
            </div>

            <div class="padding-sm border-top wrapper">
                <button class="is-red" @click="remove">Eliminar</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { getPhotoURL, removeConsignment } from "@useCases/consignment"
import { defineComponent, reactive, toRefs } from "vue"
import { toCurrency, toTimeAgo } from "@services/formatter"

export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true,
        }
    },

    setup(props, { emit }) {
        const state = reactive({
            show: false,
            image: getPhotoURL(props.data?._key),
        })

        async function remove() {
            try {
                await removeConsignment(props.data._key)
                emit("refresh")
            }

            catch (err) {
                console.error(err)
            }
        }

        return {
            ...toRefs(state),
            remove,

            toCurrency,
            toTimeAgo,
        }
    }
})
</script>