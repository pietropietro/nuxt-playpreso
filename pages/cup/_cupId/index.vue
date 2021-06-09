<template>
    <div>
        <v-row class="pa-4" align="center" v-if="currentUser && canJoinEuro">
            <v-btn text @click="joinEuro" :loading="loading">JOIN</v-btn>
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
            let resp = await this.$api.call(values);
            this.canJoinEuro = resp.canJoinEuro;
        }
    },
    async mounted(){
        await this.checkCanJoinEuro();
    }
}
</script>
