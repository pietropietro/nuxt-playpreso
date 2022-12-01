<template>
    <v-app-bar
        flat dense app
        :collapse="collapse"
        class="white--text" 
        :color="$store.state.navigation.rgb ? ppRGBA($store.state.navigation.rgb) : 'primary'" 
    >
        <nuxt-link class="no-decoration" to="/">
            <h4 v-if="$config.DEBUG" class="red--text">DEBUG</h4>
            <h1 v-else class="white--text ocrastd">PP</h1>
        </nuxt-link>
        <v-spacer/>
        <user-menu/>
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
