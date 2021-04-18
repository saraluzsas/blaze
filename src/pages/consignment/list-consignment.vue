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
        <section class="grid-1 gap-md">
            <article
                class="container"
                v-for="(section, index) in sections"
                :key="index">

                <p class="text-firstcase">{{ toTimeAgo(section.title) }}</p>

                <div class="organizer shadow-xs">
                    <consignment-item
                        v-for="consignment in section.content"
                        :key="consignment._key"
                        :data="consignment">
                    </consignment-item>
                </div>
            </article>
        </section>
    </div>

    <div class="flex-centered">
        <div class="grouper">
            <!-- TODO -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, toRaw, toRefs, watch } from "vue"
import { exportConsignment, listConsignment } from "@useCases/consignment"
import { toTimeAgo } from "@services/formatter"

export default defineComponent({
    setup() {
        const state = reactive({
            sections: [],

            from: "",
            to: "",
            search: "",

            page: 0,
            limit: 0,
        })

        // data

        async function obtainData() {
            try {
                const data = await listConsignment(toRaw(state))

                state.limit = data.pages
                state.sections = data.sections
            }

            catch (err) {
                console.error(err)
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
                const csv = await exportConsignment(toRaw(state))
                const link = document.createElement("a")

                link.download = "consignment.csv"
                link.href = `data:text/csv;charset=utf-8,${encodeURI(csv)}`

                link.click()
            }

            catch (err) {
                console.error(err)
            }
        }

        return {
            ...toRefs(state),

            exportData,
            toTimeAgo,
        }
    }
})
</script>