<template>
    <div v-if="leagues">
        <v-row class="mt-2 ml-2">
            <h1>LEAGUES</h1>
            <h4>({{leaguesFiltered.length}})</h4>
        </v-row>
        <v-row align="center" class="overline">
            <v-col class="pt-0">
                <v-chip-group
                    column
                    v-model="countryModel"
                    value="id"
                    active-class="opacity-100"
                >
                    <v-row no-gutters align="center">
                        <div class="lh-1 mr-2">COUNTRY</div>                    
                        <div v-for="c in countriesFiltered" :key="c">
                            <v-chip
                                v-if="c"
                                x-small
                                :value="c"
                            >
                                {{c}}
                                <emoji-flag  :model="c"/>
                            </v-chip>
                        </div>
                    </v-row>
                </v-chip-group>
            </v-col>
        </v-row>
        <v-data-table
            class="primary l-t"
            item-text="value"
            :items-per-page="-1" :items="leaguesFiltered"
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
            { value: 'country' }, 
            { value: 'tag' },
            { value: 'name' },
            { value: 'nextWeeks' },
            { value: 'updated_at' },
        ]
    }),
    computed:{
        leaguesFiltered(){
            if(!this.countryModel) return this.leagues;
            let areaFiltered = this.leagues.filter(l =>{
                return l;
            });
            return areaFiltered.filter(l =>{
                if(!this.countryModel) return l;
                return l.country === this.countryModel;
            });
        },
        countriesFiltered(){ 
            let uniques = [];
            let areaFiltered = this.leagues.filter(l => {
                return l;
            });
            areaFiltered.map(l => {
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
<style scoped>
 .l-t >>> .v-row-group__header,   .l-t >>> tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: var(--v-primary-darken2)!important; 
}
</style>