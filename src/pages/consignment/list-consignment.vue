<template>
    <div class="padding-md border-bottom background-light grid-1 grid-2-md gap-md">
        <div class="wrapper">
            <div class="wrapper">
                <input
                    type="date"
                    class="input"
                    v-model="from">

                <input
                    type="date"
                    class="input"
                    v-model="to">
            </div>
        </div>

        <div class="wrapper align-start">
            <input
                type="text"
                class="input is-spread"
                placeholder="Buscar (autor, nota ...)"
                v-model="search">

            <button class="is-primary" @click="exportData">Exportar</button>
        </div>
    </div>

    <div class="content">
        <section class="flex-centered height-md" v-if="loading">
            <div class="loader-md"></div>
        </section>

        <section class="grid-1 gap-md" v-else>
            <article
                class="container"
                v-for="(section, index) in sections"
                :key="index">

                <p class="text-firstcase">{{ toTimeAgo(section.title) }}</p>

                <div class="organizer shadow-xs">
                    <consignment-item
                        v-for="consignment in section.content"
                        :key="consignment._key"
                        :data="consignment"
                        @refresh="refresh">
                    </consignment-item>
                </div>
            </article>
        </section>

        <div class="flex-centered">
            <div class="grouper">
                <button @click="--page" :disabled="page === 0">
                    <feather-icon name="chevron-left"></feather-icon>
                </button>

                <button
                    v-for="number in pages"
                    :class="{ 'color-primary': number === page + 1 }"
                    @click="page = number - 1">

                    <span>{{ number }}</span>
                </button>

                <button @click="++page" :disabled="!(limit > (page + 1))">
                    <feather-icon name="chevron-right"></feather-icon>
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, reactive, toRefs, watch } from "vue"
import { exportConsignment, listConsignment } from "@useCases/consignment"
import { toTimeAgo } from "@services/formatter"

import ConsignmentItem from "./consignment-item/consignment-item.vue"

export default defineComponent({
    components: {
        ConsignmentItem,
    },

    setup() {
        const state = reactive({
            sections: [],

            from: "",
            to: "",
            search: "",

            page: 0,
            limit: 0,

            loading: true,
        })

        // data

        async function obtainData() {
            state.loading = true

            try {
                const constraints = {
                    from: state.from,
                    to: state.to,
                    page: state.page,
                    search: state.search,
                }

                const data = await listConsignment(constraints)

                state.limit = data.pages
                state.sections = data.sections
            }

            catch (err) {
                console.error(err)
            }

            finally {
                state.loading = false
            }
        }

        onBeforeMount(obtainData)

        // observe

        const observable = [
            () => state.from,
            () => state.to,
            () => state.page,
            () => state.search
        ]

        watch(observable, obtainData)

        // export

        async function exportData() {
            try {
                const constraints = {
                    from: state.from,
                    to: state.to,
                    page: state.page,
                    search: state.search,
                }

                const csv = await exportConsignment(constraints)
                const link = document.createElement("a")

                link.download = "consignment.csv"
                link.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`

                link.click()
            }

            catch (err) {
                console.error(err)
            }
        }

        // pagination

        const pages = computed(function () {
            const max = Math.min(state.page + 4, state.limit)
            const min = Math.min(state.page, state.limit - 4)

            return new Array(state.limit)
                .fill(0, 0)
                .map((curr, index) => index + 1)
                .slice(min, max)
        })

        return {
            ...toRefs(state),
            refresh: obtainData,

            exportData,
            toTimeAgo,
            pages,
        }
    }
})
</script>