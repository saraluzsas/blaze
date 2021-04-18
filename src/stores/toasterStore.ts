import { createStore } from "nuxel"

export const useToaster = createStore({
    id: "toaster",
    
    state: {
        toasts: []
    },

    actions: {
        notify(state, text: string, error: boolean = false) {
            const id = Date.now()

            const timeout = setTimeout(
                function () {
                    clearTimeout(timeout)
                    state.toasts.pop()
                },

                6_000
            )

            state.toasts.push({ id, text, error })
        }
    }
})