<template>
    <v-app-bar color="white" flat app>
        <v-spacer/>
        <nuxt-link class="no-decoration" to="/">
            <h1 class=" ocrastd">PLAYPRESO</h1>
        </nuxt-link>
        <v-spacer/>
        <user-menu/>
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
