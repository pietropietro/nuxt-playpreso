<template>
    <div>
        <v-row class="overline lh-1 my-6" justify="center"><div>based on last 30 days</div></v-row>
        <v-data-table
          :loading="loading"
          :headers="headers"
          :items="chart"
          :items-per-page="limit"
          :page.sync="page"
          @update:page="getFlashChart"
          hide-default-footer
          disable-sort
          class="transparent-table"
        >
          <!-- Custom Row Template -->
          <template v-slot:item="{ item, index }">
            <tr>
              <td class="overline lh-1">#{{ index + 1 }}</td> <!-- Position (ordered index) -->
              <td>
                <user-name :user="item.user" />
              </td>
              <td class="overline lh-1">{{ item.tot_wins }}</td>
              <td class="overline lh-1">{{ item.net_prize }}</td>
            </tr>
          </template>
        </v-data-table>
    </div>
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
</style>