<template>
    <v-container>
        <v-row justify="center" align="center" class="black-border-b" app>
            <h1 class="ocrastd">
                <b>PLAYPRESO</b>
            </h1>
        </v-row>
        <v-row class="">
            <v-col cols="12" md="6" :class="$vuetify.breakpoint.mdAndUp ? 'black-border-r' : 'black-border-b'">
                <h1>AVAILABLE</h1>
                <p-p-league-available-list class="mb-5"/>
            </v-col>
            <v-col cols="12" md="6">
                <h1>ENROLLED</h1>
                <p-p-league-participation-list/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "authenticatedHome",
    mounted(){
        this.$store.commit('navigation/setActive', { title: null, color: null});
    }
}
</script>