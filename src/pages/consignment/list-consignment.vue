<template>
    <div class="content">
        <div class="flex-spaced">
            <button>
                <span>Filtros</span>
                <feather-icon name="filter"></feather-icon>
            </button>

            <button disabled>
                <span>Exportar</span>
            </button>
        </div>

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
    </div>

    <consignment-filter v-show="showFilters" :filters="filters"></consignment-filter>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from "vue"
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
        const filters = reactive({
            from: "",
            to: "",
            groupBy: "date",
        })

        const showFilters = ref(false)

        // data

        const { meta } = useRoute()

        const list = ref(meta.list)

        return {
            filters,
            showFilters,
            toTimeAgo,

            list
        }
    }
})
</script>