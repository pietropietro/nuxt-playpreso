<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on }">
            <h1 v-on="on" class="secondary--text pointer">$</h1>
        </template>
        <v-list role="menu">
            <template v-if="currentUser">
                <v-list-item>
                    <v-list-item-title><h1 class="accent--text">{{currentUser.username}}</h1></v-list-item-title>
                </v-list-item>
                <v-list-item class="hovered pointer"
                    @click="logout()"
                >
                    <v-list-item-title><b>{{$t('app.logout')}}</b></v-list-item-title>
                </v-list-item>
            </template>
            <template v-else>
                <v-list-item>
                    <nuxt-link class="no-decoration" to="/login">
                        <b>{{$t('app.login')}}</b>
                    </nuxt-link>
                </v-list-item>
                <v-list-item>
                    <nuxt-link class="no-decoration" to="register">
                        <b>{{$t('app.register')}}</b>
                    </nuxt-link>
                </v-list-item>
            </template>
        </v-list>
    </v-menu>
</template>
<script>
export default {
    name: "UserMenu"
}
</script>