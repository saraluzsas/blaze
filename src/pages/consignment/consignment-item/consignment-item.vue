<template>
    <div class="consignment--item flex-spaced border rounded padding-sm cursor-pointer" @click="show = true">
        <div class="wrapper align-center">
            <img src="https://img.icons8.com/color/96/000000/cash-.png" loading="lazy">
        
            <div>
                <p class="text-capcase">{{ data.author }}</p>
                <small class="text-firstcase">{{ toCurrency(data.total) }}</small>
            </div>
        </div>
    </div>

    <consignment-modal
        v-if="show"
        v-bind="{ ...data, image }"
        @close="show = false"
        @remove="remove">
    </consignment-modal>
</template>

<style lang="scss" scoped>
.consignment--item {
    img {
        height: 3rem;
    }
}
</style>

<script lang="ts">
import { getPhotoURL, removeConsignment } from "@useCases/consignment"
import { defineComponent, reactive, toRefs } from "vue"
import { toCurrency, toTimeAgo } from "@services/formatter"

import ConsignmentModal from "./consignment-modal.vue"

export default defineComponent({
    components: {
        ConsignmentModal,
    },

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