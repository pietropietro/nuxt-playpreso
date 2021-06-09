<template>
    <v-row>
        <v-btn :loading="loading" block text class="text-uppercase" @click="getNextRound"><h1>{{$t('presocup.get_round') + ' ' + level}}</h1></v-btn>
    </v-row>
</template>
<script>
export default {
    name:"GetRound",
    props: {
        level: {type: Number},
        groupId: {type: Number},
        refresh: {type: Function}
    },
    data(){
        return{
            loading: false
        }
    },
    methods:{
        async getNextRound(){
            this.loading = true;
            let values = [
                {'action' : "nextPresoCupGroupRound"},
                {'presoCupGroup_id': this.groupId},
                {'userid': this.currentUser.user_id},
            ]
            let resp = await this.$api.call(values);
            this.refresh();
            this.loading = false;
        }
    }
}
</script>