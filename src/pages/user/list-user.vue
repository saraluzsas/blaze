<template>
    <div class="content">
        <div class="flex justify-end">
            <div class="wrapper">
                <router-link :to="{ name: 'user-new' }" class="button is-primary">
                    <span>Crear nuevo</span>
                </router-link>
            </div>
        </div>

        <section class="organizer shadow-xs">
            <user-item
                v-for="user in users"
                :key="user._key"
                :data="user">
            </user-item>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import { listUser } from "@useCases/user"
import { useRoute } from "vue-router"

export default defineComponent({
    async beforeRouteEnter(to, from, next) {
        try {
            const users = await listUser()

            to.meta.list = users
            next()
        }

        catch (err) {
            console.error(err)
        }
    },

    setup() {
        const { meta } = useRoute()

        const users = ref(meta.list || [])

        return { users }
    }
})
</script>