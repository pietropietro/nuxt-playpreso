<template>
    <loading-page v-if="loading" />
    <error-wall v-else-if="!loading && !user" />
    <v-container v-else>
        <trophy-scroll v-if="user.trophies && user.trophies.ppLeagues" :ups="user.trophies.ppLeagues"/>
        <!-- <chart-guesses :guesses="user.guesses"/> -->
        <!-- <user-main-data :guesses="user.guesses" :username="user.username" />
        <user-last-guesses :guesses="user.guesses"/> -->
    </v-container>
</template>
<script>
export default {
    layout: "authenticated",
    data(){
        return{
            loading: true,
            username: this.$route.params.username,
            user: null
        }
    },
    methods:{
        async getUser(){
            let response = await this.$api.call(this.API_ROUTES.USER.GET + this.username, null, 'GET');
            if(response && response.status === "success"){
                this.user = response.message;
            }

            this.$store.commit('navigation/setActive', {
                title: this.user ? this.username : null,
                color: null
            });

            this.loading = false;
        },
    }, 
    async mounted(){
        await this.getUser();
    }
}
</script>