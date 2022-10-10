<template>
    <v-navigation-drawer absolute temporary v-model="drawerModel">
        <v-list nav dense>
            <v-list-item-group v-model="group" >
                <v-list-item v-for="(feature, index) in ADMIN_FEATURES" :key="index" :to="feature.ROUTE">
                    <v-list-item-title class="text-uppercase">{{feature.NAME}}</v-list-item-title>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
export default {
    data:()=>({
        group: null,
    }),
    props:{
        drawer: {type :Boolean},
        setDrawer: {type: Function}
    },
    computed: {
        drawerModel:{
            get(){
                return this.drawer;
            },
            set(val){this.setDrawer(val)}
        }
    }
}
</script>
