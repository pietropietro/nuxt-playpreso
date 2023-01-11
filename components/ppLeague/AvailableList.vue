<template>
    <div  v-if="ppTournamentTypes.length > 0">      
        <v-row no-gutters 
            class="mb-n10 mt-2" 
            align="end"
        >
            <v-col>
                <div class="overline lh-1">{{ppTournamentTypes.length > 0 ? 'AVAILABLE P-LEAGUES' : 'NO P-LEAGUES AVAILABLE'}}</div>
            </v-col> 
        </v-row>   
        <v-data-table
            class="transparent"
            mobile-breakpoint="0"
            item-text="value"
            :items-per-page="-1" :items="ppTournamentTypes"
            :headers="headers"
            hide-default-footer
        >
            <template v-slot:item.name="{ item }">
                <v-row align="end">
                    <h2>{{ppTournamentTypeTitle(item)}}</h2>
                </v-row>
            </template>
                <template v-slot:item.cost="{ item }">
                <div class="overline lh-1">{{item.cost}}</div>
            </template>
            <template v-slot:item.id="{ item }">
                <p-p-tournament-join-row :ppTournamentTypeId="item.id" />
            </template>
        </v-data-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            activeIndex: null,
            ppTournamentTypes: [],
            headers: [
                // { value: 'level' , sortable:false}, 
                { value: 'name' , sortable:false}, 
                { value: 'cost'},
                { value: 'id' , sortable:false}, 
            ]
        }
    },
    methods:{
        async getAvailable(){
            let response = await this.$api.call(this.API_ROUTES.PPLEAGUE.AVAILABLE);
            if(response && response.status === "success"){
                this.ppTournamentTypes = response.message;
            }
            this.loading = false;
        },

    },
    async mounted(){
        await this.getAvailable(); 
    }
}
</script>