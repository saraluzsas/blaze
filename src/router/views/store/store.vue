<template>
    <div class="hero">
        <h2>Tienda</h2>

        <div class="tab">
            <router-link :to="{ name: 'store' }" exact-active-class="is-active" class="tab-item">
                <span>Resumen</span>
            </router-link>

            <router-link :to="{ name: 'store-consignment' }" exact-active-class="is-active" class="tab-item">
                <span>Consignación</span>
            </router-link>
        </div>
    </div>

    <div class="content">
        <router-view></router-view>
    </div>
</template>