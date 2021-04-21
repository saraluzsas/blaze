<template>
    <div class="fixed-backdrop flex-centered padding-sm">
        <div class="modal-md content flex-centered">
            <div class="height-md flex-centered">
                <video class="rounded-md" ref="videoRef" v-show="stream" autoplay></video>

                <div class="loader-md" v-if="isLoading"></div>

                <div class="container" v-if="!available">
                    <p>El acceso a la camara no esta disponible.</p>
                </div>
            </div>

            <div class="wrapper justify-center" v-if="!isLoading">
                <button
                    class="is-green"
                    @click="takePicture"
                    :disabled="!available">

                    <span>Capturar y guardar</span>
                </button>

                <button @click="close">Cancelar</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
video {
    max-width: 85%;
    max-height: 100%;
}
</style>

<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from "vue"

export default defineComponent({
    setup(props, { emit }) {
        const state = reactive({
            videoRef: undefined,
            stream: undefined,

            available: true,
            isLoading: true,
        })

        onMounted(async function () {
            state.isLoading = true

            try {
                const constraints: MediaStreamConstraints = {
                    audio: false,
                    video: {
                        width: { ideal: 4096 },
                        height: { ideal: 2160 }
                    }
                }

                const stream = await navigator.mediaDevices.getUserMedia(constraints)

                state.stream = stream
                state.videoRef.srcObject = stream
            }

            catch (err) {
                state.available = false
            }

            finally {
                state.isLoading = false
            }
        })

        async function closeStream() {
            if (state.stream) {
                const tracks = state.stream.getTracks()
                tracks.forEach((track: MediaStreamTrack) => track.stop())
            }
        }

        async function close() {
            await closeStream()
            emit("close")
        }

        function takePicture() {
            const canvas = document.createElement("canvas")

            canvas.width = state.videoRef.videoWidth
            canvas.height = state.videoRef.videoHeight

            canvas.getContext("2d").drawImage(state.videoRef, 0, 0, canvas.width, canvas.height)

            const data = canvas.toDataURL("image/png")
            
            closeStream()
            emit("taken", data)
        }

        return {
            close,
            takePicture,

            ...toRefs(state)
        }
    }
})
</script>