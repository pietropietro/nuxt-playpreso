<template>
    <v-container>
        <v-row class="overline lh-1 mb-4" justify="center">
            <div>based on last 30 days</div>
        </v-row>
        <!-- Headers (First Row Only) -->
        <v-row class="caption">
            <v-spacer/>
            <v-col cols="4">Wins / Locks</v-col>
            <v-col cols="2">Net</v-col>
        </v-row>

        <!-- Data Rows -->
        <v-row v-for="(item, index) in chart" :key="item.user_id" class="data-row" align="center">
            <v-col class="overline lh-1" cols="auto">#{{ index + 1 }}</v-col>
            <v-col >
                <user-name small :user="item.user" />
            </v-col>
            <v-col class="overline lh-1" cols="2" >{{ item.tot_wins }}/{{item.tot_locked}}</v-col>
            <v-col class="overline lh-1" cols="2" 
                :class="item.net_prize < 0 ? 'red--text' : ''"
            >
                {{ item.net_prize }}
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
            { value: 'tot_prize', text:'tot_prize' }, 
        ],
        total: null,
    }),
    methods:{
        async getFlashChart(){
            this.loading=true;
            let response = await this.$api.call(this.API_ROUTES.FLASH.GET_CHART + '?limit=' + this.limit + '&page=' + this.page);
            if(response && response.status === "success"){
                this.chart = [...this.chart, ...response.message.chart]; 
                // this.ppTournamentType = response.message.ppTournamentType;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getFlashChart();
    }
}
</script>

<style scoped>
.transparent-table {
  background: transparent !important;
}

.transparent-table >>> .v-data-table__wrapper {
  background: transparent !important;
}

.transparent-table >>> th,
.transparent-table >>> td {
  background: transparent !important;
  border: none !important;
}

.transparent-table >>> .v-data-footer {
  display: none !important;
}

.transparent-table >>> .table-row:hover {
  background-color: var(--v-primary-darken2) !important; /* Light blue hover effect */
}

.transparent-table >>> .text-right {
  text-align: right;
}

.transparent-table >>> .text-left {
  text-align: left;
}
</style>