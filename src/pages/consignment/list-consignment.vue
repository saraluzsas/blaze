<template>
    <div class="padding-md border-bottom background-light flex-spaced">
        <div class="wrapper">
            <button class="is-primary">Exportar</button>
        </div>

        <div class="wrapper">
            <!-- filters -->

            <div class="dropdown">
                <button>
                    <span>Fecha</span>
                    <feather-icon name="calendar"></feather-icon>
                </button>

                <div class="dropdown-list container padding-xs">
                    <small>Desde - Hasta</small>

                    <div class="organizer">
                        <input
                            type="date"
                            class="input is-spread"
                            v-model="filters.from"
                            placeholder="Hello">

                        <input
                            type="date"
                            class="input is-spread"
                            v-model="filters.to"
                            placeholder="Hello">
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="content">
        <section class="xs-1 gap-md">
            <article
                class="container"
                v-for="(group, index) in list"
                :key="index">

                <p class="text-firstcase">{{ toTimeAgo(group.date) }}</p>

                <div class="organizer shadow-xs">
                    <consignment-item
                        v-for="consignment in group.content"
                        :key="consignment._key"
                        :data="consignment">
                    </consignment-item>
                </div>
            </article>
        </section>

        <div class="flex-centered">
            <div class="grouper">
                <button @click="--filters.page" :disabled="filters.page === 0">
                    <feather-icon name="chevron-left"></feather-icon>
                </button>

                <button @click="++filters.page">
                    <feather-icon name="chevron-right"></feather-icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRaw, watch } from "vue"
import { listConsignment } from "@useCases/consignment"
import { toTimeAgo } from "@services/formatter"
import { useRoute } from "vue-router"

export default defineComponent({
    async beforeRouteEnter(to, from, next) {
        try {
            const consignments = await listConsignment()

            to.meta.list = consignments
            next()
        }

        catch (err) {
            console.error(err)
        }
    },

    setup() {
        // data

        const { meta } = useRoute()

        const list = ref(meta.list)

        // filters

        const filters = reactive({
            from: "",
            to: "",
            page: 0,
        })

        watch([filters], async function () {
            try {
                list.value = []
                list.value = await listConsignment(toRaw(filters))
            }

            catch (err) {
                console.error(err)
            }
        })

        return {
            filters,

            toTimeAgo,
            list
        }
    }
})
</script>