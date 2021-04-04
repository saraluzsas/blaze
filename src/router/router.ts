import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { isLogged, isLogged } from "vue-use-firebase"

const store: RouteRecordRaw = {
    path: "store",
    component: () => import("./views/store/store.vue"),
    children: [
        {
            path: "",
            name: "store",
            component: () => import("./views/store/store-resume.vue")
        },

        {
            path: "consignment",
            name: "store-consignment",
            component: () => import("./views/consignment/create-consignment.vue")
        }
    ]
}

const routes: RouteRecordRaw[] = [
    {
        path: "/sign",
        component: () => import("./layouts/auth/auth-layout.vue"),
        meta: { anonymous: true },
        children: [
            {
                path: "",
                alias: ["send"],
                name: "send-code",
                component: () => import("./views/auth/send-code.vue")
            },

            {
                path: "code",
                name: "verify-code",
                component: () => import("./views/auth/verify-code.vue")
            }
        ]
    },

    {
        path: "/",
        component: () => import("./layouts/app/app-layout.vue"),
        children: [
            {
                path: "",
                name: "home",
                component: () => import("./views/home/dashboard.vue")
            },

            store
        ]
    },

    {
        path: "/:paramsAll(.*)",
        component: () => import("./views/not-found.vue")
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async function (to, from, next) {
    const isAuthed = await isLogged()

    if (to.meta.anonymous || isAuthed) next()

    else {
        next({ name: "send-code" })
    }
})