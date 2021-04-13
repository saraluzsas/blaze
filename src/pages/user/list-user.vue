<template>
    <div class="content">
        <div class="wrapper">
            <input
                type="text"
                class="input is-spread"
                placeholder="Buscar"
                required>

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
import { defineComponent, onBeforeMount, ref } from "vue"

import axios from "axios"

export default defineComponent({
    setup() {
        const users = ref([])

        onBeforeMount(async function () {
            try {
                const res = await axios.get("/user")

                if (Array.isArray(res.data)) {
                    users.value = res.data
                }
            }

            catch (err) {
                console.error(err)
                users.value = []
            }
        })

        return { users }
    }
})
</script>