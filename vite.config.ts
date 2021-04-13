import { defineConfig } from "vite"
import { resolve } from "path"

import vue from "@vitejs/plugin-vue"
import components from "vite-plugin-components"

export default defineConfig({
    resolve: {
        alias: {
            "@stores": resolve(__dirname, "./src/stores"),
            "@services": resolve(__dirname, "./src/services"),
            "@useCases": resolve(__dirname, "./src/useCases"),
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

        components({
            extensions: ["vue"],
            dirs: ["src/components"]
        })
    ],
})