<template>
    <v-container>
        <v-row class="overline lh-1 mb-4" justify="center">
            <div>based on last 30 days</div>
        </v-row>
        <!-- Headers (First Row Only) -->
        <v-row class="caption">
            <v-spacer/>
            <v-col class="text-end" cols="2">Wins</v-col>
            <v-col class="text-center" cols="2">Jackpot</v-col>
            <v-col class="text-end" cols="2">Points</v-col>
        </v-row>

        <!-- Data Rows -->
        <v-row v-for="(item, index) in chart" :key="item.user_id" 
            class="data-row" 
            align="center"
        >
            <v-col class="overline lh-1" cols="auto">#{{ index + 1 }}</v-col>
            <v-col >
                <user-name small :user="item.user" />
            </v-col>
            <v-col class="overline lh-1 text-end" cols="1" >{{ item.tot_wins }}</v-col>
            <v-col class="overline lh-1 text-end" cols="2" 
                :class="item.net_prize < 0 ? 'red--text' : ''"
            >
                {{ item.tot_prize }}
            </v-col>
            <v-col class="overline lh-1 text-end" cols="2" 
                :class="item.net_prize < 0 ? 'red--text' : ''"
            >
                {{ item.tot_points }}
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data:()=>({
        loading: false,
        limit: 10,
        page: 1,
        chart: [],
        headers: [
            { value: 'user', text:'user' }, 
            { value: 'tot_wins', text:'tot_wins'},
            { value: 'tot_prize', text:'tot_prize'}, 
        ],
        total: null,
    }),
    methods:{
        async getMotdChart(){
            this.loading=true;
            let response = await this.$api.call(this.API_ROUTES.MOTD.GET_CHART + '?limit=' + this.limit + '&page=' + this.page);
            if(response && response.status === "success"){
                this.chart = response.message.chart;
                this.total = response.message.total;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getMotdChart();
    }
}
</script>