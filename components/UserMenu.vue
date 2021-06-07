<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on }">
            <h1 v-on="on" class="secondary--text pointer">$</h1>
        </template>
        <v-list role="menu">
            <v-list-item v-if="currentUser">
                <v-list-item-title><h1 class="accent--text">{{currentUser.username}}</h1></v-list-item-title>
            </v-list-item>
            <v-list-item class="hovered pointer"
                @click="logout()"
            >
                <v-list-item-title><b>{{$t('app.logout')}}</b></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>
<script>
export default {
    name: "UserMenu"
}
</script>