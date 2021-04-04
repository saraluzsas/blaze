<template>
    <main class="auth--layout">
        <div class="auth--box">
            <router-view v-slot="{ Component, route }">
                <transition name="slide-fade" mode="out-in">
                    <div class="content" :key="route.fullPath">
                        <component :is="Component"></component>
                    </div>
                </transition>
            </router-view>
        </div>

        <div class="auth--image">
            <img src="./auth-image.png" loading="lazy" alt="auth image">
        </div>
    </main>
</template>

<style lang="scss">
.auth--layout {
    display: grid;
    max-height: 100vh;
    grid-template-columns: 4fr 6fr;
    overflow: hidden;

    .auth--image {
        overflow: hidden;

        img {
            height: 100vh;
        }
    }

    .auth--box {
        width: 100%;
        padding: 2rem;
        padding-top: 4rem;
        max-width: 35rem;
        margin: 0 auto;
    }

    @media (max-width: 1024px) {
        grid-template-columns: 1fr;

        .auth--image {
            display: none;
        }
    }
}
</style>