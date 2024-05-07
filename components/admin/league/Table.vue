<template>
    <div>
    <template v-if="!leaguesProps && !countryModel">
            <v-chip-group
                column
                v-model="countryModel"
            >
                <v-row no-gutters align="center">
                    <div v-for="c in countries" :key="c">
                        <v-chip
                            v-if="c"
                            :outlined="countryModel != c"
                            :value="c"
                        >
                            <h4>{{c}}</h4>
                            <emoji-flag class="pl-2" :model="c" size="1.5rem"/>
                        </v-chip>
                    </div>
                </v-row>
            </v-chip-group>
        </template>
        <v-row class="my-2 ml-2 text-uppercase" justify="space-between" align="center" v-if="leagues">
            <v-col>
                <v-row no-gutters>
                    <h1>{{countryModel }} LEAGUES</h1>
                    <h4>({{total}})</h4>
                </v-row>
            </v-col>
            <v-col v-if="countryModel" cols="auto">
                <v-row align="center">
                    <v-col>
                        <emoji-flag :model="countryModel" size="2.5rem"/>
                    </v-col>
                    <v-col>
                        <div class="pointer" @click="()=>countryModel=null">
                            <h1>X</h1>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-data-table
            :loading="loading"
            :items-per-page="limit"
            class="primary l-t mb-5"
            item-text="value"
            :items="leagues"
            :headers="headers"
            :expanded.sync="expanded"
            group-by="parent_id"
            singleExpand
            hide-default-footer
            @click:row="(item)=>expandRow(item)"
        >
            <template v-slot:group.header="{ items, toggle }" >
                <td v-if="items[0].parent_id" :colspan="headers.length">
                    <v-row @click="toggle">
                        <v-col cols="auto"><div class="ocrastd">#{{items[0].id}}+</div></v-col>
                        <v-col>
                            <h2>
                                {{ items[0].name }}
                            </h2>
                        </v-col>
                    </v-row>
                </td>
            </template>
            <template v-slot:item.country="{ item }">
                    <v-row align="end">
                        <h1><emoji-flag  :model="item.country" /></h1>
                        <h2>{{item.level}}</h2>
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
            <template v-slot:item.nextWeeks="{ item }">
                <em-emoji 
                    v-for="(n,i) in item.nextWeeks"
                    :key="i"
                    :native="n ? 'large_green_circle' : 'red_circle'" 
                />
            </template>
            <template v-slot:item.updated_at="{ item }">
                <div v-if="item.ls_410" style="color:red">
                    <b>410</b>
                </div>
                <div class="overline" v-else>
                    {{ formatDate(item.updated_at, true) }}
                </div>
            </template>
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <admin-league-detail  :id="item.id" :onEdit="refresh"/>
                </td>
            </template>
            <template v-slot:footer
                v-if="leagues?.length > 0 && total > limit"
            >
                <v-pagination
                    @input="getLeagues"
                    class="pt-5 pb-3"
                    total-visible="5"
                    v-model="page"
                    :length="Math.ceil(total / limit)"
                />
            </template>
        </v-data-table>
     
    </div>
</template>
<script>
export default {
    // THIS COMPONENT CAN BE GIVEN LEAGUES OR CAN FETCH ON ITS OWN
    props:{
        leaguesProps: {type: Array, required: false},
        refresh: {type: Function, required: false}
    },
    data:()=>({
        loading: false,
        expanded: [],
        headers: [
            { value: 'id' }, 
            { value: 'country' }, 
            { value: 'tag' },
            { value: 'name' },
            { value: 'nextWeeks' },
            { value: 'updated_at' },
        ],
        leaguesFetched: [],
        total: 0,
        limit: 10,
        page: 1,
        countries: null,
        countryModel: null
    }),
    computed:{
        leagues(){
            return this.leaguesProps ?? this.leaguesFetched;
        }
    },
    methods:{
        expandRow(item){
            if(this.expanded.length>0 && this.expanded[0].id==item.id){
                this.expanded = [];
                return;
            } 
            this.expanded = [];
            setTimeout(()=>{this.expanded.push(item);});
        },
        async getLeagues(){
            this.loading=true;
            this.leaguesFetched = [];

            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET + '?country=' + this.countryModel + '&page=' + this.page + '&limit=' + this.limit);
            if(response && response.status === "success"){
                this.total = response.message.total
                this.leaguesFetched = response.message.leagues;
            }
            this.loading = false;
        },
        async getLeagueCountries(){
            this.loading=true;
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET_COUNTRY);
            if(response && response.status === "success"){
                this.countries = response.message;
                if (!this.countries.includes('ALL')) {
                    this.countries.unshift('ALL');
                }
            }
            this.loading = false;
        },
    },
    watch: {
        async countryModel (newId, oldId) {
            if(!!newId){
                this.page=1;
                await this.getLeagues();
            }
        },
    },
    async mounted(){
        await this.getLeagueCountries();
    },
}
</script>
<style scoped>
 .l-t >>> .v-row-group__header,   .l-t >>> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: var(--v-primary-darken2)!important; 
}
</style>