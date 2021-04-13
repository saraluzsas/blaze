<template>
    <div class="xs-1 gap-md">
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
                <span></span>
                <a class="color-primary cursor-pointer text-xs" @click="addDetail">Agregar</a>
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
            <button class="is-primary" @click="showCamera = true" :disabled="disabled">
                <feather-icon name="camera"></feather-icon>
                <span>Tomar foto</span>
            </button>
        </div>
    </div>

    <camera-modal
        v-if="showCamera"
        @close="showCamera = false"
        @taken="save">
    </camera-modal>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue"
import { useRouter } from "vue-router"

import axios from "axios"

export default defineComponent({
    components: {
        CameraModal,
        ConsignmentDetail
    },

    setup() {
        const state = reactive({
            note: "",
            details: [{ amount: "", date: "" }],

            showCamera: false,
        })

        const disabled = computed(function () {
            return state.details.some(detail => detail.amount === "" || detail.date === "")
        })

        // details

        function addDetail() {
            state.details.push({ amount: "", date: "" })
        }

        function removeDetail(index: number) {
            state.details.splice(index, 1)
        }

        // save

        const { push: navigate } = useRouter()

        async function save(photo: string) {
            state.showCamera = false

            try {
                const consignment = {
                    note: state.note,
                    details: state.details,
                    photo: photo,
                    draft: true,
                    total: 0,
                }

                await axios.post("/consignment", consignment)
                await navigate("/consignment")
            }

            catch (err) {
                console.error(err)
            }
        }

        return {
            ...toRefs(state),
            disabled,

            addDetail,
            removeDetail,

            save,
        }
    }
})
</script>