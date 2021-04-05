<template>
    <div class="app--profile box is-hoverable flex is-spaced">
        <div>
            <p class="text-capcase">{{ user?.nickname }}</p>
            <small class="text-capcase">{{ role }}</small>
        </div>

        <feather-icon name="chevron-right" color="#aaa"></feather-icon>
    </div>
</template>

<style lang="scss">
.app--profile {
    width: 100%;
}
</style>

<script lang="ts">
import { useAuthStore } from "@/stores/authStore"
import { computed, defineComponent, toRef } from "vue"

export default defineComponent({
    setup() {
        const store = useAuthStore()
        const user = toRef(store.state, "user")

        const role = computed(function () {
            switch (user?.value?.role) {
                case "developer":
                    return "desarrollador"

                case "auditor":
                    return "auditor"

                case "store":
                    return "tienda"

                default:
                    return "anonimo"
            }
        })

        return { user, role }
    }
})
</script>