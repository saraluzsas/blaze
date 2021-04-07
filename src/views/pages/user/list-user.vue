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

        <section class="user--list grid has-gap">
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

import UserItem from "@components/user-item.vue"
import axios from "axios"

export default defineComponent({
    components: {
        UserItem,
    },

    setup() {
        const users = ref([])

        onBeforeMount(async function () {
            try {
                const res = await axios.get("/user")

                if (res.data.error) {
                    console.warn(res.data)
                }

                else {
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