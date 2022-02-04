import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import Carrousel from "@/views/Carrousel.vue";

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Carrousel,
        children: [
            {
                path: ':name',
                name: 'CarouselName',
                component: Carrousel
            }
            ]
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
