<template>
    <v-app-bar color="var(--v-background-base)"
        flat 
        :app="!$vuetify.breakpoint.smAndUp"
        class="no-height"
        style="font-size: 1.25rem;"
    >
        <v-container class="px-0">
            <v-row class="mx-2 mx-sm-6">
                <nuxt-link class="no-decoration" to="/">
                    <h1 class="ocrastd">PLAYPRESO</h1>
                </nuxt-link>
                <v-spacer/>
                <div class="ocrastd" @click="()=> computedMenu = !computedMenu ">
                    <h1>{{menu ? 'X' : '>'}}</h1>
                </div>
            </v-row>
        </v-container>
    </v-app-bar>
</template>
<script>
export default {
    props:{
        collapse: {type: Boolean},
        menu: {type: Boolean},
        setMenu: {type: Function},
    },
    computed: {
        computedMenu:{
            get(){
                return this.menu
            },
            set(val){
                this.setMenu(val);
            }
        }
    }
}
</script>

<style>

.no-height, .v-toolbar__content{
    height: auto !important;
}

</style>