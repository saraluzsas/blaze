<template>
    <div class="content">
        <div class="flex-spaced">
            <div class="wrapper align-center">
                <img src="https://img.icons8.com/color/96/000000/circled-user-male-skin-type-1-2--v1.png">

                <div class="info">
                    <p class="text-capcase">{{ user.nickname }}</p>
                </div>
            </div>
        </div>

        <form @submit.prevent="save">
            <div class="container">
                <label for="nickname">Apodo</label>
                <input
                    id="nickname"
                    type="text"
                    class="input is-spread"
                    placeholder="Apodo"
                    v-model="user.nickname"
                    autocomplete="off"
                    required>
            </div>

            <div class="container">
                <label for="phone">Teléfono</label>
                <div class="grouper">
                    <div class="button is-static">+57</div>

                    <input
                        id="phone"
                        type="tel"
                        class="input is-spread"
                        placeholder="300 0000 000"
                        pattern="[0-9]+"
                        maxlength="10"
                        minlength="10"
                        autocomplete="off"
                        v-model="user.phone"
                        required>
                </div>
            </div>

            <div class="container">
                <label for="role">Rol</label>
                <select
                    class="input"
                    id="role"
                    v-model="user.role"
                    required>

                    <option value="" disabled>Seleciona un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="store">Tienda</option>
                </select>
            </div>

            <div class="wrapper">
                <button class="is-green" :class="{ 'has-loader': loading }">
                    <span>Guardar</span>    
                </button>

                <router-link to="/user" class="button">Cancelar</router-link>
            </div>
        </form>
    </div>
</template>

<style lang="scss" scoped>
img {
    height: 3rem;
}
</style>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import { findUserById, editUser } from "@useCases/user"
import { useRoute } from "vue-router"

export default defineComponent({
    async beforeRouteEnter(to, from, next) {
        const id = to.params.id.toString()

        try {
            const user = await findUserById(id)

            if (user) {
                to.meta = { ...to.meta, ...user }
                next()
            }

            else next("/user")
        }

        catch (err) {
            console.error(err)
            next("/user")
        }
    },

    setup() {
        const { meta, params } = useRoute()

        const loading = ref(false)

        const user = reactive({
            phone: (meta.phone as string)?.split("+57")[1],
            nickname: meta.nickname,
            role: meta.role,
        })

        async function save() {
            loading.value = true

            try {
                const id = params.id.toString()
                await editUser(id, { ...user, phone: "+57" + user.phone })
            }

            catch (err) {
                console.error(err)
            }

            finally {
                loading.value = false
            }
        }

        return { user, save, loading }
    }
})
</script>