<template>
    <main class="content not-found">
        <h1>Oops...</h1>
        <p>Parece que esta vista no está disponible o no tienes permisos para verla, permiteme llevarte de vuelta al inicio.</p>

        <div class="wrapper">
            <router-link to="/" class="button is-primary">Volver al inicio</router-link>
        </div>
    </main>
</template>

<style lang="scss">
main.not-found {
    width: 100%;
    max-width: 40rem;
    margin: 0 auto;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
</style>