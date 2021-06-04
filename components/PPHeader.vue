<template>
     <v-app-bar color="primary" fixed-left dense app>
        <nuxt-link class="no-decoration" to="/">
            <h1 class="secondary--text">PLAYPRESO</h1>
        </nuxt-link>
        <v-spacer/>
        <!-- <user-menu v-if="isAuthenticated" /> -->
        <h1 class="secondary--texts" v-if="currentUser">{{currentUser.username}}</h1>
        <template v-else>
            <nuxt-link class="no-decoration" to="login">
                <h1 class="secondary--text">{{$t('app.login')}}</h1>
            </nuxt-link>
        </template>
    </v-app-bar>
</template>
<script>
export default {
    name: "PPHeader"
}
</script>