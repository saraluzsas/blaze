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
            <user-item></user-item>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

import UserItem from "@components/user-item.vue"

export default defineComponent({
    components: {
        UserItem,
    },

    setup() {
        
    }
})
</script>