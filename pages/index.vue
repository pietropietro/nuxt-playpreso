<template>
    <v-container fluid fill-height style="background-color:blue;">
        <v-row justify="center" v-if="currentUser && currentUser.user_id===3">
            <nuxt-link to="admin">
                <v-btn>ADMIN</v-btn>
            </nuxt-link>
        </v-row>
        <v-row justify="center">
            <nuxt-link to="/cup/12">
                <v-img style="max-width:150px;" contain :src="require('@/assets/img/cup/euro.png')"/>
            </nuxt-link>
        </v-row>
    </v-container>
</template>