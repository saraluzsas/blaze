<template>
    <div class="flex-column justify-end gap-md background-light padding-md border-bottom height-xl">
        <h3>Tienda</h3>

        <div class="tab">
            <router-link to="/store" class="tab-item" exact-active-class="is-active">
                <span>Resumen</span>
            </router-link>

            <router-link to="/store/consignment" class="tab-item" exact-active-class="is-active">
                <span>Consignación</span>
            </router-link>
        </div>
    </div>

    <div class="content">
        <router-view></router-view>
    </div>
</template>