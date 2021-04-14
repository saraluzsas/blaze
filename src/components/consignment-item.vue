<template>
    <div class="flex-spaced border radius padding-sm cursor-pointer">
        <div class="wrapper align-center">
            <img src="https://img.icons8.com/color/96/000000/cash-.png">
        
            <div>
                <p class="text-capcase">{{ data.author }}</p>
                <small>{{ total }}</small>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
img {
    height: 3rem;
}
</style>

<script lang="ts">
import { computed, defineComponent } from "vue"

export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true,
        }
    },

    setup(props) {
        const total = computed(function () {
            const number = parseInt(props.data.total) || 0
            return number.toLocaleString("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 })
        })

        return { total }
    }
})
</script>