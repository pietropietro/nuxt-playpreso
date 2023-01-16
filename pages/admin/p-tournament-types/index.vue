<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="ppTournamentTypes">
        <div>
            <h1>P-TOURNAMENT-TYPES</h1>
            <v-data-table
                item-text="value"
                :items-per-page="-1" :items="ppTournamentTypes"
                :headers="headers"
                :expanded.sync="expanded"
                singleExpand
                hide-default-footer
                @click:row="(item)=>expandRow(item)"
            >
                <template v-slot:item.id="{ item }">
                    <div class="ocrastd"
                    >
                        #{{ item.id }}
                    </div>
                </template>
                <template v-slot:item.rgb="{ item }">
                    <v-sheet width="20" height="20" :color="ppRGBA(item.rgb)" rounded/>
                    <!-- <div class="overline lh-1">
                        {{ item.rgb }}
                    </div> -->
                </template>
                <template v-slot:item.cup_format="{ item }">
                    <div class="overline lh-1">
                        {{ !!item.cup_format ? 'P-CUP' : 'P-LEAGUE' }}
                    </div>
                </template>
                <template v-slot:item.emoji="{ item }">
                    <h2>
                        {{ item.emoji }}
                    </h2>
                </template>
                <template v-slot:item.name="{ item }">
                    <h2>
                        {{ item.name }}
                    </h2>
                </template>
                <template v-slot:item.level="{ item }">
                    <h2>
                        {{ item.level }}
                    </h2>
                </template>
                <template v-slot:item.leagues="{ item }">
                    <template v-if="item.leagues.length < 4">
                        <div v-for="league in item.leagues" :key="league.id">
                            <league-detail :league="league" sizeClass="text-h5"/>
                        </div>
                    </template>
                    <div class="overline lh-1" v-else>
                        {{item.leagues.length}} leagues
                    </div>
                </template>
                <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length">
                        <admin-p-p-tournament-type-detail :ppTournamentType="item" />
                    </td>
                </template>
            </v-data-table>
        </div>
    </v-container>
    <error-wall v-else/>
</template>
<script>

export default {
    layout: "admin",
     data:()=>({
        ppTournamentTypes: null,
        loading: true,
        expanded: [],
        headers: [
            { value: 'id' }, 
            { value: 'cup_format' },
            { value: 'rgb' },
            { value: 'emoji' },
            { value: 'name'},
            { value: 'level', align:'start'},
            { value: 'leagues' }, 
        ]
    }),
    async mounted(){
        await this.getPPTTournamentTypes();
    },
    methods:{
        async getPPTTournamentTypes(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.PPTOURNAMENTTYPES.GET);
            if(response && response.status === "success"){
                this.ppTournamentTypes = response.message;
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