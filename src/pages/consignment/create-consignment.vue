<template>
    <div class="content grid-1 gap-md">
        <article class="container">
            <div class="grid-1 gap-md">
                <consignment-detail
                    v-for="detail in details"
                    :key="detail.id"
                    :data="detail"
                    :canRemove="details.length > 1"
                    @remove="() => removeDetail(detail.id)">
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
import { createConsignment } from "@useCases/consignment"
import { useRouter } from "vue-router"

export default defineComponent({
    setup() {
        const state = reactive({
            note: "",
            details: [{ id: Date.now(), amount: "", date: "" }],

            showCamera: false,
        })

        const disabled = computed(function () {
            return state.details.some(detail => detail.amount === "" || detail.date === "")
        })

        // details

        function addDetail() {
            state.details.push({ id: Date.now(), amount: "", date: "" })
        }

        function removeDetail(id: number) {
            state.details = state.details.filter(curr => curr.id !== id)
        }

        // save

        const { push: navigate } = useRouter()

        async function save(photo: string) {
            state.showCamera = false

            try {
                await createConsignment(photo, state.details, state.note)
                await navigate("/")
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