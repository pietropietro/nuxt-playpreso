<template>
    <v-app-bar color="white" class="no-height" style="height:auto;" flat app>
        <v-container class="border-b">
            <v-row class="mx-2">
                <v-spacer/>
                <nuxt-link class="no-decoration" to="/">
                    <h1 class=" ocrastd">PLAYPRESO</h1>
                </nuxt-link>
                <v-spacer/>
                <user-menu/>
            </v-row>
        </v-container>
        <!-- <v-spacer/> -->
    </v-app-bar>
</template>
<script>
export default {
    props:{
        collapse: {type: Boolean},
        menu: {type: Boolean}
    }
}
</script>

<style>

.no-height, .v-toolbar__content{
    height: auto !important;
}

</style>