<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on }">
            <h1 v-on="on" class="secondary--text pointer" v-if="currentUser">{{currentUser.username}}</h1>
        </template>
        <v-list class="pointer" role="menu">
            <v-list-item class="hovered"
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