<template>
    <v-app-bar 
        class="white--text" 
        :color="$store.state.navigation.color ? $store.state.navigation.color : 'primary'" 
        fixed-left dense app
    >
        <nuxt-link class="no-decoration" to="/">
            <h1 class="white--text ocrastd">PP</h1>
        </nuxt-link>
        <v-spacer/>
        <h2>{{$store.state.navigation.title}}</h2>
        <v-spacer/>
        <!-- <h3 class="white--text ocrastd pr-4" v-if="currentUser">{{currentPoints}}</h3> -->
        <user-menu />
    </v-app-bar>
</template>
<script>
export default {
    name: "PPHeader"
}
</script>