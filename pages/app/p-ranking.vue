<template>
    <v-container class="pt-0" >
        <v-row class="flex-nowrap mt-2">
            <v-spacer/>
            <em-emoji id="first_place_medal" size="5em"/>
            <v-spacer/>
        </v-row>
        <v-row class="px-4 my-4" justify="center">
            <div class="caption lh-1 text-center">
                *based on last 3 months 
            </div>
        </v-row>
        <loading-page v-if="loading"/>
        <p-p-ranking-table v-else-if="ppRankings" :ppRankings="ppRankings"/>
        <v-row class="text-center py-4">
            <v-col><div @click="()=>page--"  v-if="page!=1" class="overline lh-1">previous</div></v-col>
            <v-col><div class="overline lh-1">{{page}}</div></v-col>
            <v-col><div @click="()=>page++" class="overline lh-1" v-if="total/limit >= page" >next</div></v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "private",
    data(){
        return {
            page: 1,
            loading: false,
            ppRankings: [],
            limit:10,
            total: null
        }
    },
    watch:{
        async page(){
            await this.getPPRankings();
        }
    },
    methods:{
        async getPPRankings(){
            this.loading=true;
            let response = await this.$api.call(this.API_ROUTES.PPRANKING.GET + '?limit=' + this.limit + '&page=' + this.page);
            if(response && response.status === "success"){
                this.ppRankings = response.message.ppRankings;
                this.total = response.message.total;
            }
            this.loading = false;
        },
    },
    async mounted(){
        this.$store.dispatch(
            'navigation/updateTitle', 
            {
                newTitle: 'P-RANKING',
                newEmoji: null,
                newOverline: null
            }        
        );
        await this.getPPRankings();
    }
}
</script>
