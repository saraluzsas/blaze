<template>
    <slot v-if="show"></slot>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, reactive, toRef, toRefs } from "vue"
import { useAuthStore } from "@stores/authStore"

export default defineComponent({
    props: {
        roles: String
    },
    
    setup(props) {
        const { state, actions } = useAuthStore()

        const user = toRef(state, "user")

        const show = computed(function () {
            if (props.roles) {
                const roles = props.roles.split(",").map(role => role.trim())
                return roles.includes(user?.value?.role)
            }

            else return true
        })

        onBeforeMount(async function () {
            await actions.fetchUser()
        })

        return { user, show }
    }
})
</script>