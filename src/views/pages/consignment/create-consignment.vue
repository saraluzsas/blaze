<template>
    <form>
        <article class="container">
            <div class="xs-1 gap-md">
                <consignment-detail
                    v-for="(detail, index) in details"
                    :key="index"
                    :data="detail"
                    @remove="removeDetail(index)"
                    :canRemove="details.length > 1">
                </consignment-detail>
            </div>

            <div class="flex-spaced">
                <span>$ 0</span>

                <a class="color-primary text-xs" @click="addDetail">Agregar</a>
            </div>
        </article>

        <div class="container">
            <label for="note">Nota</label>

            <textarea
                id="note"
                class="input"
                v-model="note"
                placeholder="Escribe tu nota (opcional)"></textarea>
        </div>

        <div class="wrapper">
            <button class="is-primary">
                <feather-icon name="camera"></feather-icon>
                <span>Tomar foto</span>
            </button>
        </div>
    </form>

    <camera-modal
        v-if="showCamera"
        @close="closeCamera"
        @taken="photoTaken">
    </camera-modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue"

import CameraModal from "@components/camera-modal.vue"
import ConsignmentDetail from "@components/consignment-detail.vue"

export default defineComponent({
    components: {
        CameraModal,
        ConsignmentDetail
    },

    setup() {
        const state = reactive({
            photo: "",
            note: "",

            details: [{ amount: "", date: "" }],

            showCamera: false,
        })

        const disabled = computed(function () {
            return state.details.some(detail => detail.amount === "" || detail.date === "")
        })

        const addDetail = () => state.details.push({ amount: "", date: "" })
        const removeDetail = (index: number) => state.details = state.details.filter((curr, key) => key !== index)

        const closeCamera = () => state.showCamera = false

        const photoTaken = (data: string) => {
            state.photo = data
            state.showCamera = false
        }

        return {
            disabled,
            ...toRefs(state),

            addDetail,
            removeDetail,

            closeCamera,
            photoTaken,
        }
    }
})
</script>