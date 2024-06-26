<template>
    <div v-if="ppTournamentTypes.length > 0">  
        <v-row  class="ocrastd text-center mx-4" 
            style="font-size:30px; font-weight: bold;
                background:linear-gradient(#eb34bd, transparent); border-radius: 10px;"  
            align="center"
        >
            <v-col cols="auto">P-TOURNAMENTS</v-col>
        </v-row>

        <v-data-table
            class="transparent no-select px-5 pt-4"
            mobile-breakpoint="0"
            item-text="value"
            :items-per-page="-1" 
            :items="ppTournamentTypes.length > 3 && !showAllFlag ? ppTournamentTypes.slice(0,3) : ppTournamentTypes"
            :headers="headers"
            hide-default-footer
            hide-default-header
        >
            <template v-slot:item.emoji="{ item }">
            <em-emoji v-if="item.emoji"
                :native="item.emoji" size="2em"
            />
            </template>
            <template v-slot:item.name="{ item }">
                <div class="my-5">
                    <v-row align="end">
                        <h2>{{ppTournamentTypeTitle(item)}}</h2>
                    </v-row>
                    <v-row class="overline lh-1">
                        {{item.user_cnt ? (item.participants - item.user_cnt) : item.participants}} more players to start
                    </v-row>
                </div>
            </template>
                <template v-slot:item.cost="{ item }">
                <div class="overline lh-1">{{item.cost}}</div>
            </template>
            <template v-slot:item.id="{ item }">
                <p-p-tournament-join-row :ppTournamentTypeId="item.id" />
            </template>
        </v-data-table>
        <div v-if="ppTournamentTypes.length > 3" 
            class="text-center lh-1 overline font-weight-bold mt-10" 
            @click="showAllFlag = !showAllFlag"
        >
            {{showAllFlag ? 'show less' : 'show more'}}
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            ppTournamentTypes: [],
            showAllFlag: false,
            headers: [
                { value: 'emoji' , sortable:false}, 
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
                this.ppTournamentTypes.map((e)=>{e.isSelectable=false})
            }
            this.loading = false;
        },

    },
    async mounted(){
        await this.getAvailable(); 
    }
}
</script>
<style lang="scss">
    .no-select tbody {
        tr:hover {
            background-color: transparent !important;
        }
    }
</style>