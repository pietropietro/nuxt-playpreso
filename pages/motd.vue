<template>
    <v-container class="pt-0" fill-height >
        <v-row class="flex-nowrap my-2">
            <v-spacer/>
            <em-emoji id="jigsaw" size="5em"/>
            <v-spacer/>
        </v-row>
        <loading-page v-if="loading"/>
        <motd-table v-else-if="chart" :chart="chart" :page="page"/>
        <v-row class="text-center py-10">
            <v-col><div @click="()=>page--"  v-if="page!=1" class="overline lh-1">previous</div></v-col>
            <v-col><div class="overline lh-1">{{page}}</div></v-col>
            <v-col><div @click="()=>page++" class="overline lh-1" v-if="total/limit >= page" >next</div></v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "authenticated",
    data(){
        return {
            page: 1,
            loading: false,
            chart: [],
            limit:10,
            total: null
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
