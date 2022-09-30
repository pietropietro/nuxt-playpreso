<template>
    <v-app-bar
        flat dense app
        :collapse="$store.state.navigation.rgb"
        class="white--text" 
        :color="$store.state.navigation.rgb ? ppRGBA($store.state.navigation.rgb) : 'primary'" 
    >
        <nuxt-link class="no-decoration" to="/">
            <h1 class="white--text ocrastd">PP</h1>
        </nuxt-link>
        <v-spacer/>
        <user-menu v-if="!$store.state.navigation.rgb"/>
    </v-app-bar>
</template>
