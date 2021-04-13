import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { isLogged } from "vue-use-firebase"

const routes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("./layouts/app/app-layout.vue"),
        children: [
            // STORE

            {
                path: "store",
                component: () => import("./layouts/store/store-layout.vue"),
                children: [
                    {
                        path: "consignment",
                        component: () => import("./pages/consignment/create-consignment.vue")
                    }
                ]
            }
        ]
    },

    // USER

    {
        path: "/user",
        component: () => import("./layouts/app/app-layout.vue"),
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
        children: [
            {
                path: "",
                component: () => import("./pages/consignment/list-consignment.vue")
            },

            {
                path: "",
                component: () => import("./pages/consignment/create-consignment.vue")
            }
        ]
    },

    // NOT FOUND

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
        next({ name: "sign-in" })
    }
})