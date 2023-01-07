<template>
    <v-container fill-height>
        <v-row justify="center"><h1 class="ocrastd">{{currentUser.username}}</h1></v-row>
        <v-row justify="center"><h1 class="ocrastd">{{currentPoints}}PP</h1></v-row>
        <v-row justify="center">
            <h1 class="ocrastd">RULES</h1>
        </v-row>
        <v-row justify="center" @click="$logout.logout()">
            <h1 class="ocrastd">LOGOUT</h1>
        </v-row>
    </v-container>
</template>
<script>
export default {
    
}
</script>