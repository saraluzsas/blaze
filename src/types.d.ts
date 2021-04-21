import { defineComponent } from "vue"

declare global {
    interface ImportMeta {
        env: any
    }
}

declare module "*.vue" {
    const component: ReturnType<typeof defineComponent>
    export default component
}