<template>
    <div v-if="ppRankings">
        <v-row no-gutters class="ml-n3">
            <span style="font-size: 60px; font-weight: bold; line-height: 0.7em;">PRANKINGPRANKINGPRANKINGPRANKINGPRANKINGPRANKINGPRANKING</span>
            <em-emoji class="mt-n3" style="position: absolute; left:10%" id="first_place_medal" size="5em" /> 
        </v-row>
        <v-row no-gutters class="ml-n1">
            <span style="font-size: 60px; font-weight: bold; line-height: 0.7em;">NKINGPRANKINGPRANKINGPRANKINGPRANKINGPRANKING</span>
        </v-row>
        
        <p-p-ranking-table class="mt-10" :ppRankings="ppRankings" />
        
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