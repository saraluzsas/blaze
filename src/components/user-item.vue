<template>
    <router-link
        :to="{ name: 'user-edit', params: { id: data._key } }"
        class="border rounded padding-sm flex-spaced align-center cursor-pointer">

        <div class="wrapper gap-sm align-center">
            <img src="https://img.icons8.com/color/96/000000/circled-user-male-skin-type-1-2--v1.png" loading="lazy">

            <div>
                <p class="text-capcase">{{ data.nickname }}</p>
                <small>{{ data.phone }}</small>
            </div>
        </div>

        <feather-icon name="chevron-right" class="color-gray"></feather-icon>
    </router-link>
</template>

<style scoped>
img {
    height: 3rem;
}
</style>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true
        }
    }
})
</script>