<template>
     <v-app-bar color="primary" fixed-left dense app>
        <nuxt-link class="no-decoration" to="/">
            <h1 class="white--text ocrastd">PP</h1>
        </nuxt-link>
        <v-spacer/>
        <user-menu />
    </v-app-bar>
</template>
<script>
export default {
    name: "PPHeader"
}
</script>