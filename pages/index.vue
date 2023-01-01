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
            <v-col cols="12" md="6" class="ml-n4 mr-0 pr-0">
                <h1 class="px-4">ENROLLED</h1>
                <p-p-league-participation-list :userParticipations="userParticipations"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "authenticatedHome",
    data(){
        return {
            userParticipations: null
        }
    },
    methods:{
        async getParticipations(){
            let response = await this.$api.call(this.API_ROUTES.USER_PARTICIPATION.GET);
            if(response && response.status === "success"){
                this.userParticipations = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getParticipations();
        this.$store.commit('navigation/setActive', { title: null, color: null});
    },


}
</script>