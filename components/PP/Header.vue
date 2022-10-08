<template>
    <v-app-bar
        flat dense app
        :collapse="collapse"
        class="white--text" 
        :color="$store.state.navigation.rgb ? ppRGBA($store.state.navigation.rgb) : 'primary'" 
    >
        <nuxt-link class="no-decoration" to="/">
            <h1 class="white--text ocrastd">PP</h1>
        </nuxt-link>
        <v-spacer/>
        <user-menu v-if="menu"/>
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
