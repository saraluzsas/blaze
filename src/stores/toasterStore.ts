import { createStore } from "nuxel"

type Color = "primary" | "error" | "success"

type Subtitle = {
    text: string
    color: Color
}

export const useToaster = createStore({
    id: "toaster",
    
    state: {
        toasts: []
    },

    actions: {
        add(state, title: string, subtitle?: Subtitle) {
            const timeout = setTimeout(
                function () {
                    clearTimeout(timeout)
                    state.toasts.pop()
                },

                6_000
            )

            state.toasts.push({ title, subtitle })
        }
    }
})