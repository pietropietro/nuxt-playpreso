<template>
    <div>
        <v-row class="pa-4" justify="center" align="center" v-if="currentUser && canJoinEuro">
            <v-btn color="primary" block text @click="joinEuro" :loading="loading"><h1>JOIN</h1></v-btn>
        </v-row>
        <cup-table v-if="!loading" :id="cupId"/>
    </div>
</template>
<script>
export default {
    data(){
        return{
            cupId: this.$route.params.cupId,
            canJoinEuro: false,
            loading: false,
        }
    },
    methods:{
        async joinEuro(){
            this.loading = true;
            let values = [
                {'action' : "joinPresoCup"},
                {'userid' : this.currentUser.user_id},
                {'cuptypeid' : 5}
            ]
            let resp = await this.$api.call(values);
            await this.checkCanJoinEuro();
            this.loading = false;
        },

        async checkCanJoinEuro(){
            if(!this.currentUser)return;
            let values = [
                {'action' : "getHomePresoCups"},
                {'userid' : this.currentUser.user_id},
            ]
            let resp = await this.$api.call(values);
            this.canJoinEuro = resp?.canJoinEuro;
        }
    },
    async mounted(){
        await this.checkCanJoinEuro();
    }
}
</script>
