import { useAuthStore } from "@stores/authStore"
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { isLogged } from "vue-use-firebase"

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("./layouts/app/app-layout.vue"),
        children: [
            {
                path: "",
                name: "home",
                component: () => import("./pages/dashboard.vue")
            },
        ]
    },

    // AUTH

    {
        path: "/sign",
        component: () => import("./layouts/auth/auth-layout.vue"),
        meta: { anonymous: true },
        children: [
            {
                path: "",
                name: "sign-in",
                alias: ["send", "in"],
                component: () => import("./pages/auth/send-code.vue")
            },

            {
                path: "/verify",
                name: "verify-code",
                component: () => import("./pages/auth/verify-code.vue")
            }
        ]
    },

    // USER

    {
        path: "/user",
        component: () => import("./layouts/app/app-layout.vue"),
        meta: { role: "admin" },
        children: [
            {
                path: "",
                component: () => import("./pages/user/list-user.vue")
            },

            {
                path: "new",
                name: "user-new",
                component: () => import("./pages/user/create-user.vue")
            },

            {
                path: ":id",
                name: "user-edit",
                component: () => import("./pages/user/edit-user.vue")
            },
        ]
    },

    // CONSIGNMENT

    {
        path: "/consignment",
        component: () => import("./layouts/app/app-layout.vue"),
        meta: { role: "admin" },
        children: [
            {
                path: "",
                component: () => import("./pages/consignment/list-consignment.vue")
            },

            {
                path: "",
                component: () => import("./pages/consignment/create-consignment.vue")
            },

            {
                path: "new",
                meta: { role: "store" },
                component: () => import("./pages/consignment/create-consignment.vue")
            }
        ]
    },

    // NOT FOUND

    {
        path: "/:all(.*)",
        name: "not-found",
        component: () => import("./pages/not-found.vue")
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async function (to, from, next) {
    const isAuthed = await isLogged()

    if (to.meta.anonymous || to.name === "sign-in" || isAuthed) {
        if (to.meta.role) {
            const { state, actions } = useAuthStore()

            if (!state.user) await actions.fetchUser()

            if (state.user.role === to.meta.role) next()
            else next("/401")
        }

        else next()
    }

    else {
        next({ name: "sign-in" })
    }
})