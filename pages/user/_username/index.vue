<template>
    <loading-page v-if="loading" />
    <error-wall v-else-if="!loading && !user" />
    <div v-else>
        <trophy-dex
            :ppDex="user.ppDex"
        />
        <!-- <v-container class="px-0"> -->
            <!-- <trophy-scroll v-if="user.trophies && user.trophies.length > 0" :ups="user.trophies"/> -->
            <!-- <chart-guesses :guesses="user.guesses"/> -->
            <!-- <user-main-data :guesses="user.guesses" :username="user.username" />
            <user-last-guesses :guesses="user.guesses"/> -->
        <!-- </v-container> -->
    </div>
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
            this.updateAppBarTitle();
            this.loading = false;
        },
        updateAppBarTitle(){
            this.$store.dispatch(
            'navigation/updateTitle', 
            {
                newTitle: this.user.username,
                newEmoji: null,
                newOverline: null
            }
        );
        }
    }, 
    async mounted(){
        await this.getUser();
    }
}
</script>