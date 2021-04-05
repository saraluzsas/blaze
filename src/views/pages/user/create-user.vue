<template>
    <div class="content">
        <form>
            <div class="field">
                <label for="nickname">Apodo</label>
                <input id="nickname" type="text" class="input is-spread" placeholder="Apodo">
            </div>

            <div class="field">
                <label for="phone">Teléfono</label>
                <input id="phone" type="tel" class="input is-spread" placeholder="300 0000 000">
            </div>

            <div class="field">
                <label for="role">Rol</label>
                <select class="input" id="role">
                    <option value="developer">Desarrollador</option>
                    <option value="developer">Auditor</option>
                    <option value="developer">Tienda</option>
                </select>
            </div>

            <div class="wrapper">
                <button class="is-primary">Guardar</button>
            </div>
        </form>
    </div>
</template>