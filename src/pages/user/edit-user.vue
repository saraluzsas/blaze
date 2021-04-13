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

            <button class="is-red">
                <span>Eliminar</span>
            </button>
        </div>

        <form>
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
import { defineComponent, reactive, toRefs } from "vue"

export default defineComponent({
    setup() {
        const state = reactive({
            nickname: "",
            phone: "",
            role: "",

            loading: false,
        })

        return { ...toRefs(state) }
    }
})
</script>