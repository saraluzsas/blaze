<template>
    <div class="content">
        <div class="flex-spaced">
            <div class="wrapper align-center">
                <img src="https://img.icons8.com/color/96/000000/circled-user-male-skin-type-1-2--v1.png">

                <div class="info">
                    <p>Andres Celis</p>
                    <small>Desarrollador</small>
                </div>
            </div>

            <button class="is-red" @click="showRemoveConfirmation = true">
                <span>Eliminar</span>
            </button>
        </div>

        <div class="fixed-backdrop flex-centered padding-md" v-if="showRemoveConfirmation">
            <div class="modal-sm">
                <div class="container padding-md">
                    <p class="color-red">Eliminar usuario</p>
                    <p>Estas a punto de eliminar este usuario, por lo que no podrá volver a acceder al sistema. Escribe el número del usuario para confirmar.</p>
                </div>

                <div class="wrapper padding-sm background-light border-top">
                    <button class="is-red" @click="remove">Si, eliminar</button>
                    <button @click="showRemoveConfirmation = false">Cancelar</button>
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
                    <option value="developer">Desarrollador</option>
                    <option value="auditor">Auditor</option>
                    <option value="store">Tienda</option>
                </select>
            </div>

            <div class="wrapper">
                <button class="is-green">
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
import { findUserById, editUser, removeUser } from "@useCases/user"
import { useRoute, useRouter } from "vue-router"

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
        const { push: navigate } = useRouter()

        const phone = (meta.phone as string)?.split("+57")[1]

        const user = reactive({
            phone: phone,
            nickname: meta.nickname,
            role: meta.role,
        })

        async function save() {
            try {
                const id = params.id.toString()

                await editUser(id, { ...user, phone: "+57" + user.phone })
                await navigate("/user")
            }

            catch (err) {
                console.error(err)
            }
        }

        // remove

        const showRemoveConfirmation = ref(false)

        async function remove() {
            try {
                const id = params.id.toString()

                await removeUser(id)
                await navigate("/user")
            }

            catch (err) {
                console.error(err)
            }
        }

        return { user, save, remove, showRemoveConfirmation }
    }
})
</script>