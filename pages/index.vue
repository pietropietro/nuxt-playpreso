<template>
    <v-container style="background-color: var(--v-background-base);" class="pt-0">
        <v-row>
            <v-col cols="12" md="6">
                <h1>AVAILABLE</h1>
                <p-p-league-available-list />
            </v-col>
            <v-col >
                <h1>ENROLLED</h1>
                <user-participation-list :userParticipations="userParticipations"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "authenticated",
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