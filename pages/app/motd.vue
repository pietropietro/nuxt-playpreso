<template>
    <loading-page v-if="loading"/>
        <v-container class="px-0" fill-height v-else-if="chart && ppTournamentType">
            <v-row class="flex-nowrap mt-2">
                <v-spacer/>
                <em-emoji :native="ppTournamentType.emoji" size="5em"/>
                <v-spacer/>
            </v-row>
            <v-row class="px-4 my-4" justify="center">
                <div class="caption lh-1 text-center">
                    *based on last month <br>
                    matches of the day
                </div>
            </v-row>
            <motd-table :chart="chart" :page="page" :rgb="ppTournamentType.rgb"/>
            <v-row class="text-center py-10">
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
            chart: [],
            limit:10,
            total: null,
            ppTournamentType: null
        }
    },
    watch:{
        async page(){
            await this.getMotdChart();
        }
    },
    methods:{
        async getMotdChart(){
            this.loading=true;
            let response = await this.$api.call(this.API_ROUTES.MOTD.GET_CHART + '?limit=' + this.limit + '&page=' + this.page);
            if(response && response.status === "success"){
                this.chart = response.message.chart;
                this.total = response.message.total;
                this.ppTournamentType = response.message.ppTournamentType;
            }
            this.loading = false;
        },
    },
    async mounted(){
        this.$store.dispatch(
            'navigation/updateTitle', 
            {
                newTitle: 'MOTD',
                newEmoji: null,
                newOverline: null
            }        
        );
        await this.getMotdChart();
    }
}
</script>
