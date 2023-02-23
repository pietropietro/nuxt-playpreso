<template>
    <div v-if="leagues">
        <h1>LEAGUES</h1>
        <v-row align="center" class="overline">
            <v-col>
                <v-chip-group
                    column
                    v-model="countryModel"
                    value="id"
                    active-class="opacity-100"
                >
                    <h4 class="pointer mx-4" @click="()=>countryModel=null">x</h4>
                    <div v-for="c in countries" :key="c">
                        <v-chip
                            v-if="c"
                            x-small
                            :value="c"
                        >
                            {{c}}
                            <p-p-emoji flag :model="c"/>
                        </v-chip>
                    </div>
                </v-chip-group>
            </v-col>
        </v-row>
        <v-data-table
            class="primary"
            item-text="value"
            :items-per-page="-1" :items="leaguesFiltered"
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
                    <admin-league-detail  :id="item.id" :onEdit="refresh" :leagues="leagues"/>
                </td>
            </template>
        </v-data-table>
    </div>
    <error-wall v-else/>
</template>
<script>
export default {
    props:{
        leagues: {type: Array},
        refresh: {type: Function}
    },
    data:()=>({
        countryModel: null,
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
    computed:{
        leaguesFiltered(){
            if(!this.countryModel) return this.leagues;
            return this.leagues.filter(l =>{
                return l.country === this.countryModel;
            });
        },
        countries(){ 
            let uniques = [];
            this.leagues.map(l => {
                if(!uniques.includes(l.country)){
                    uniques.push(l.country);
                }
            });
            return uniques;
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
        }
    }
}
</script>