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
                <a class="color-primary cursor-pointer text-xs text-uppcase" @click="addDetail">Agregar</a>

                <div class="wrapper align-center">
                    <p class="text-uppcase text-xs">Subtotal</p>
                    <p>{{ total }}</p>
                </div>
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
            <button
                class="is-primary"
                @click="showCamera = true"
                :class="{ 'has-loader': loading }"
                :disabled="disabled || loading">

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
import { toCurrency } from "@services/formatter"

export default defineComponent({
    setup() {
        const state = reactive({
            note: "",
            details: [{ id: Date.now(), amount: "", date: "" }],

            showCamera: false,
            loading: false,
        })

        const disabled = computed(function () {
            return state.details.some(detail => detail.amount === "" || detail.date === "")
        })

        const total = computed(function () {
            const sum = state.details
                .map(curr => parseInt(curr.amount) || 0)
                .reduce((prev, curr) => prev += curr || 0, 0)
    
            return toCurrency(sum)
        })

        // details

        function addDetail() {
            state.details.push({ id: Date.now(), amount: "", date: "" })
        }

        function removeDetail(id: number) {
            state.details = state.details.filter(curr => curr.id !== id)
        }

        // save

        async function save(photo: string) {
            state.showCamera = false
            state.loading = true

            try {
                window.onbeforeunload = function () {
                    return ""
                }

                await createConsignment(photo, state.details, state.note)
                window.onbeforeunload = undefined
            }

            catch (err) {
                console.error(err)
            }

            finally {
                state.loading = false

                state.details = [{ id: Date.now(), amount: "", date: "" }]
                state.note = ""
            }
        }

        return {
            ...toRefs(state),
            disabled,
            total,

            addDetail,
            removeDetail,

            save,
        }
    }
})
</script>