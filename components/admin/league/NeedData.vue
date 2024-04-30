<template>
    <v-container v-if="leagues">
        <v-row no-gutters justify="center">
            <v-switch inset
                v-model="futureModel"
                :label="futureModel ? 'future' : 'past'"
                @change="refresh"
                :loading="loading"
            />
            <v-switch v-if="!futureModel"
                inset 
                v-model="withGuessesModel" 
                label="w/guess"
                @change="refresh()"
                :loading="loading"
            />
        </v-row>
        <loading-page v-if="loading" />
        <admin-league-table v-else-if="leagues" :leaguesProps="leagues" :refresh="refresh"/>
    </v-container>
</template>
<script>
export default {
    data(){
        return{
            leagues: null,
            loading: null,
            withGuessesModel: false,
            futureModel: false
        }
    },
    async mounted(){
       await this.refresh();
    },
    methods:{
        async refresh(){
            this.loading= true;
            if(this.futureModel){
                return await this.getNeedFutureData();
            }
            await this.getNeedPastData();
        },
        async getNeedPastData(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET_NEED_PAST_DATA + 
                (this.withGuessesModel ? '?withGuesses=1' : '')
            );
            if(response && response.status === "success"){
                this.leagues = response.message;
            }
            this.loading = false;
        },
        async getNeedFutureData(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET_NEED_FUTURE_DATA);
            if(response && response.status === "success"){
                this.leagues = response.message;
            }
            this.loading = false;
        },
    }
}
</script>