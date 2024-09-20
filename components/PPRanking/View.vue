<template>
    <div v-if="ppRankings">
        <v-row  class="mx-4 ocrastd" 
            style="font-size:30px; font-weight: bold; background:linear-gradient(#FFD700, transparent); border-radius: 10px;"  
            align="center"
        >
            <v-col>P-RAN-KING</v-col>
            <em-emoji style="position:absolute; left:66%" id="crown" size="3em"/>
        </v-row>
        
        <p-p-ranking-table class="mt-6 px-5" :ppRankings="ppRankings" />
        
        <v-row justify="center" class="mt-10">
            <nuxt-link to="/p-ranking" class="no-decoration">
                <div
                    class="text-center lh-1 overline font-weight-bold"
                >
                    show more
                </div>
            </nuxt-link>
        </v-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            ppRankings: null,
        }
    },
    methods:{
        async getPPRankings(){
            let response = await this.$api.call(this.API_ROUTES.PPRANKING.GET + '?limit=5');
            if(response && response.status === "success"){
                this.ppRankings = response.message.ppRankings;
                // this.userStat = response.message?.currentUserStat;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getPPRankings();
    }
}
</script>