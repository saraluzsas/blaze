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

    <div id="recaptcha--container" ref="captchaContainer"></div>
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
        padding: 0 .5rem;
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

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import { useSignIn } from "vue-use-firebase"

export default defineComponent({
    setup() {
        const { setupRecaptcha } = useSignIn()

        const captchaContainer = ref<HTMLDivElement>(null)

        onMounted(async function () {
            captchaContainer.value.innerHTML = ""
            await setupRecaptcha("recaptcha--container", { size: "invisible" })
        })

        return { captchaContainer }
    }
})
</script>