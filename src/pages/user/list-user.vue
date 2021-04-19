<template>
    <div class="content">
        <div class="flex justify-end">
            <div class="wrapper">
                <router-link :to="{ name: 'user-new' }" class="button is-primary">
                    <span>Crear nuevo</span>
                </router-link>
            </div>
        </div>

        <section class="flex-centered height-md" v-if="loading">
            <div class="loader-md"></div>
        </section>

        <section class="organizer shadow-xs" v-else>
            <user-item
                v-for="user in list"
                :key="user._key"
                :data="user">
            </user-item>
        </section>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRefs } from "vue"
import { listUser } from "@useCases/user"

export default defineComponent({
    setup() {
        const state = reactive({
            list: [],
            loading: true,
        })

        onBeforeMount(async function () {
            state.loading = true

            try {
                state.list = await listUser()
            }

            catch (err) {
                console.error(err)
            }

            finally {
                state.loading = false
            }
        })

        return {
            ...toRefs(state)
        }
    }
})
</script>