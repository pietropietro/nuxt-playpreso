<template>
    <div>
        <v-row class="pa-4" justify="center" align="center" v-if="currentUser && canJoinEuro">
            <v-btn color="primary" block text @click="joinEuro" :loading="loading"><h1>JOIN</h1></v-btn>
        </v-row>
        <preso-cup-table v-if="!loading" :id="cupId"/>
    </div>
</template>
<script>
export default {
    data(){
        return{
            cupId: this.$route.params.cupId,
            canJoinEuro: false,
            loading: false,
            idModel: 3
        }
    },
    methods:{
        showerror(){
            this.$notifier.showError();
        },
        async joinEuro(){
            this.loading = true;
            let values = [
                {'action' : "joinPresoCup"},
                {'userid' : this.idModel},
                {'cuptypeid' : 5}
            ]
            let resp = await this.$api.call(values);
            this.loading = false;
            this.checkCanJoinEuro();
        },

        async checkCanJoinEuro(){
            let values = [
                {'action' : "getHomePresoCups"},
                {'userid' : this.idModel},
            ]
            console.log("call canjoin");
            let resp = await this.$api.call(values);
            console.log("resp",resp);
            this.canJoinEuro = resp?.canJoinEuro;
        }
    },
    async mounted(){
        await this.checkCanJoinEuro();
    }
}
</script>
