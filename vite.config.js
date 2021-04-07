import { defineConfig } from "vite"
import { resolve } from "path"

import vue from "@vitejs/plugin-vue"
import jsx from "@vitejs/plugin-vue-jsx"

export default defineConfig({
    resolve: {
        alias: {
            "@stores": resolve(__dirname, "./src/stores"),
            "@components": resolve(__dirname, "./src/components")
        }
    },

    plugins: [
        vue({
            template: {
                compilerOptions: {
                    isCustomElement: tag => tag === "feather-icon"
                }
            }
        }),

        jsx()
    ],
})