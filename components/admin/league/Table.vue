<template>
    <loading-page v-if="loading"/>
    <div v-else-if="leagues">
        <admin-league-create :leagues="leagues" :refresh="getLeagues"/>
            <h1>LEAGUES</h1>
            <v-data-table
                item-text="value"
                :items-per-page="-1" :items="leagues"
                :headers="headers"
                :expanded.sync="expanded"
                singleExpand
                hide-default-footer
                @click:row="(item)=>expandRow(item)"
            >
                <template v-slot:item.area="{ item }">
                    <v-row align="end">
                    <h1><p-p-emoji flag :model="item.area" /></h1>
                        <h2>{{item.area_level}}</h2>
                    </v-row>
                </template>
                <template v-slot:item.country="{ item }">
                        <v-row align="end">
                            <h1><p-p-emoji flag :model="item.country" /></h1>
                            <h2>{{item.country_level}}</h2>
                        </v-row>
                </template>
                <template v-slot:item.id="{ item }">
                    <div class="ocrastd"
                    >
                        #{{ item.id }}
                    </div>
                </template>
                <template v-slot:item.name="{ item }">
                    <h2>
                        {{ item.name }}
                    </h2>
                </template>
                <template v-slot:item.updated_at="{ item }">
                    <div class="overline"
                    >
                        {{ formatDate(item.updated_at, true) }}
                    </div>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <admin-league-detail  :id="item.id"/>
                    </td>
                </template>
            </v-data-table>
    </div>
    <error-wall v-else/>
</template>
<script>
export default {
    data:()=>({
        leagues: null,
        loading: true,
        expanded: [],
        headers: [
            { value: 'id' }, 
            { value: 'area'},
            { value: 'country' }, 
            { value: 'tag' },
            { value: 'name' },
            { value: 'updated_at' },
        ]
    }),
    async mounted(){
        await this.getLeagues();
    },
    methods:{
        async getLeagues(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET);
            if(response && response.status === "success"){
                this.leagues = response.message;
            }
            this.loading = false;
        },
        expandRow(item){
            if(this.expanded.length>0 && this.expanded[0].id==item.id){
                this.expanded = [];
                return;
            } 
            this.expanded = [];
            setTimeout(()=>{this.expanded.push(item);});
        }
    }
}
</script>