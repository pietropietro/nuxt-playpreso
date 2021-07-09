<template>
    <loading-page v-if="loading || !user" />
    <v-container v-else>
        <v-row justify="center" class="my-4">
            <h1 class="ocrastd primary--text text-uppercase">{{username}}</h1>
        </v-row>
        <chart-guesses :guesses="user.guesses"/>
        <!-- <user-main-data :user="user" />
        <trophies-list :trophies="user.Trophies"/>
        <league-top-stats :stats="user.leagueTopStats"/> -->
    </v-container>
</template>
<script>
export default {
    data(){
        return{
            loading: false,
            username: this.$route.params.username,
            user: null
        }
    },
    async mounted(){
        this.loading = true;
        let values = [
            {'action' : "loadUser"},
            {'username': this.username},
        ]
        this.user = await this.$api.call(values);
        this.loading = false;
    }
}
</script>