<template>
    <div class="content">
        <h3>Crear usuario</h3>

        <form @submit.prevent="save">
            <div class="container">
                <label for="nickname">Apodo</label>
                <input
                    id="nickname"
                    type="text"
                    class="input is-spread"
                    placeholder="Apodo"
                    v-model="nickname"
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
                        v-model="phone"
                        required>
                </div>
            </div>

            <div class="container">
                <label for="role">Rol</label>
                <select
                    class="input"
                    id="role"
                    v-model="role"
                    required>

                    <option value="" disabled>Seleciona un rol</option>
                    <option value="admin">Administrador</option>
                    <option value="store">Tienda</option>
                </select>
            </div>

            <div class="wrapper">
                <button
                    type="submit"
                    class="is-primary"
                    :disabled="disabled || loading"
                    :class="{ 'has-loader': loading }">

                    <span>Registrar</span>    
                </button>

                <router-link to="/user" class="button">Cancelar</router-link>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs } from "vue"

import { useRouter } from "vue-router"
import { createUser } from "@useCases/user"

export default defineComponent({
    setup() {
        const { push: navigate } = useRouter()

        const state = reactive({
            nickname: "",
            phone: "",
            role: "",

            loading: false,
        })

        const disabled = computed(function () {
            return state.nickname === "" || state.phone === "" || state.role === ""
        })

        async function save() {
            state.loading = true

            try {
                const { nickname, phone, role } = state

                await createUser(nickname, phone, role)
                await navigate("/")
            }
            
            catch (err) {
                console.error(err)
            }

            finally {
                state.loading = false
            }
        }

        return {
            ...toRefs(state),

            disabled,
            save,
        }
    }
})
</script>