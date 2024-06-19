<template>
    <div v-if="ppRankings">
        <v-row align="center">
            <v-col cols="auto">
                <em-emoji id="first_place_medal" size="5em" /> 
            </v-col>
            <v-col>
                <v-row no-gutters style="font-size: 40px; font-weight: bold;">P-RANKING</v-row>
                <v-row no-gutters class="caption font-italic">calculated daily. based on trophies and points from last 6 months</v-row>
            </v-col>
        </v-row>
        
        <p-p-ranking-table :ppRankings="ppRankings" />
        
        <v-row justify="center" class="mt-4">
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