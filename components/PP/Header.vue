<template>
    <v-app-bar color="white" class="no-height" style="height:auto;" flat app>
        <v-container>
            <v-row class="mx-2">
                <v-spacer/>
                <nuxt-link class="no-decoration" to="/">
                    <h1 class=" ocrastd">PLAYPRESO</h1>
                </nuxt-link>
                <v-spacer/>
                <div class="ocrastd" @click="()=> computedMenu = !computedMenu ">
                    <h1>{{menuScreen ? 'X' : '>'}}</h1>
                </div>
            </v-row>
        </v-container>
    </v-app-bar>
</template>
<script>
export default {
    props:{
        collapse: {type: Boolean},
        menuScreen: {type: Boolean},
        setMenu: {type: Function}
    },
    computed: {
        computedMenu:{
            get(){
                return this.menuScreen
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