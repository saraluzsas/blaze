import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { isLogged } from "vue-use-firebase"

const store: RouteRecordRaw = {
    path: "store",
    component: () => import("./pages/store/store.vue"),
    children: [
        {
            path: "",
            name: "store",
            component: () => import("./pages/store/store-resume.vue")
        },

        {
            path: "consignment",
            name: "store-consignment",
            component: () => import("./pages/consignment/create-consignment.vue")
        }
    ]
}

const auth: RouteRecordRaw = {
    path: "/sign",
    component: () => import("./layouts/auth/auth-layout.vue"),
    meta: { anonymous: true },
    children: [
        {
            path: "",
            alias: ["send"],
            name: "send-code",
            component: () => import("./pages/auth/send-code.vue")
        },

        {
            path: "code",
            name: "verify-code",
            component: () => import("./pages/auth/verify-code.vue")
        }
    ]
}

const user: RouteRecordRaw = {
    path: "/user",
    component: () => import("./layouts/app/app-layout.vue"),
    children: [
        {
            path: "",
            name: "user-list",
            component: () => import("./pages/user/list-user.vue")
        },

        {
            path: "new",
            name: "user-new",
            component: () => import("./pages/user/create-user.vue")
        }
    ]
}

const routes: RouteRecordRaw[] = [
    auth,

    user,

    {
        path: "/",
        component: () => import("./layouts/app/app-layout.vue"),
        children: [
            {
                path: "",
                name: "home",
                component: () => import("./pages/home/dashboard.vue")
            },

            store
        ]
    },

    {
        path: "/:paramsAll(.*)",
        component: () => import("./pages/not-found.vue")
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