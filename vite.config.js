import { defineConfig } from "vite"
import { resolve } from "path"

import vue from "@vitejs/plugin-vue"
import jsx from "@vitejs/plugin-vue-jsx"

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
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