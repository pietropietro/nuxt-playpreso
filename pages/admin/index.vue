<template>
    <v-container fill-height>
            <v-row justify="center" align="center" style="height:50%; background-color:blue">
            <nuxt-link to="admin/new" class="no-decoration">
                <h1 class="white--text">ADD</h1>
            </nuxt-link>
            </v-row>
        <v-row justify="center" align="center" style="height:50%;">
            <nuxt-link to="admin/list" class="no-decoration">
            <h1>UPDATE</h1>
            </nuxt-link>
        </v-row>
    </v-container>
</template>