<template>
    <input
        type="text"
        class="input is-spread"
        placeholder="$ 0"
        :value="state.value"
        @keyup="onKeyUp"
        v-bind="$attrs">
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue"
import { toCurrency } from "@services/formatter"

export default defineComponent({
    props: {
        modelValue: {
            type: String,
            default: ""
        }
    },

    setup(props, { emit }) {
        const state = reactive({
            value: props.modelValue
        })

        function onKeyUp(event: KeyboardEvent) {
            const reg = /[0-9]+/

            if (reg.test(event.key) || event.key === "Backspace") {
                try {
                    const value = event.target["value"].replace(/\D/g, "")
                    let number = parseInt(value)

                    state.value = isNaN(number) ? "" : toCurrency(number)
                    emit("update:modelValue", isNaN(number) ? "" : number.toString())
                }

                catch (err) {
                    console.error(err)
                }
            }

            else {
                event.preventDefault()
            }
        }

        return { state, onKeyUp }
    }
})
</script>