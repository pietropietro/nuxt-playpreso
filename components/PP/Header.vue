<template>
    <v-app-bar color="var(--v-background-base)" class="no-height" style="height:auto;" flat app>
        <v-container>
            <v-row class="mx-2">
                <v-spacer/>
                <nuxt-link class="no-decoration" to="/">
                    <!-- <div class="text-h3 font-weight-bold">PLAYPRESO</div> -->
                    <h1 class="ocrastd">PLAYPRESO</h1>
                </nuxt-link>
                <v-spacer/>
                <!-- <div class="ocrastd" @click="()=> computedMenu = !computedMenu ">
                    <h1>{{menuScreen ? 'X' : '>'}}</h1>
                </div> -->
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