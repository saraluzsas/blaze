<template>
    <section>
        <article class="consignment--details">
            <p>Detalles</p>

            <div class="container">
                <consignment-detail
                    v-for="(detail, index) in details"
                    :key="index"
                    :detail="detail"
                    :canRemove="details.length > 1"
                    @remove="() => removeDetail(index)">
                </consignment-detail>
            </div>

            <div class="flex is-spaced">
                <a class="text-link text-xs text-uppcase" @click="addDetail">Agregar</a>
            </div>
        </article>

        <article class="consignment--note">
            <label for="note">Nota</label>
            <textarea
                id="note"
                class="input"
                v-model="note"
                placeholder="Escribe tu nota">
            </textarea>
        </article>

        <div class="wrapper">
            <button
                class="is-primary"
                @click="showCamera = true"
                :disabled="disabled">

                <feather-icon name="camera"></feather-icon>
                <span>Tomar foto</span>
            </button>
        </div>
    </section>

    <camera-modal
        v-if="showCamera"
        @close="closeCamera"
        @taken="photoTaken">
    </camera-modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue"

import CameraModal from "@/components/camera-modal.vue"
import ConsignmentDetail from "@/components/consignment-detail.vue"

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