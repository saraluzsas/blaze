<template>
    <div class="dropdown app--profile">
        <div class="profile--image">
            <img src="https://img.icons8.com/color/144/000000/user-male-circle--v1.png">
        </div>
    </div>
</template>

<style lang="scss">
.app--profile {
    .profile--image {
        cursor: pointer;

        img {
            max-height: 2.5rem;
        }
    }
}
</style>

<script lang="ts">
import { useAuthStore } from "@stores/authStore"
import { useRouter } from "vue-router"
import { computed, defineComponent, toRef } from "vue"

export default defineComponent({
    setup() {
        const { state, actions } = useAuthStore()

        const user = toRef(state, "user")

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

        const { push: navigate } = useRouter()

        async function logOut() {
            await actions.signOut()
            await navigate({ name: "sign-in" })
        }

        return { user, role, logOut }
    }
})
</script>