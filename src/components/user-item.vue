<template>
    <router-link :to="{ name: 'user-edit', params: { id: data._key } }" class="user--item box is-link flex is-spaced">
        <div class="container">
            <p class="text-capcase">{{ data.nickname }}</p>
        
            <div class="wrapper">
                <div class="chip text-capcase">{{ role }}</div>
                <div class="chip">{{ data.phone }}</div>
            </div>
        </div>

        <feather-icon name="chevron-right" color="#bbb"></feather-icon>
    </router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue"

export default defineComponent({
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    
    setup(props) {
        const role = computed(function () {
            switch (props.data.role) {
                case "developer":
                    return "desarrollador"
                
                case "store":
                    return "tienda"

                case "auditor":
                    return "auditor"

                default:
                    return "otro"
            }
        })

        return { role }
    }
})
</script>