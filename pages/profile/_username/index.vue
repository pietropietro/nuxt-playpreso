<template>
    <loading-page v-if="loading || !user" />
    <div v-else>
        <!-- <chart-guesses :guesses="user.guesses"/> -->
        <user-main-data :guesses="user.guesses" :username="user.username" />
        <user-last-guesses :guesses="user.guesses"/>
    </div>
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