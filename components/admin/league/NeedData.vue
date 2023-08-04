<template>
    <loading-page v-if="loading" />
    <v-container v-else>
        <v-row justify="center" no-gutters>
            <v-switch inset 
                v-model="withGuessesModel" 
                label="w/guess"
                @change="getNeedData()"
                :loading="loading"
            />
        </v-row>
        <admin-league-table :leagues="leagues" :refresh="getNeedData"/>
    </v-container>
</template>
<script>
export default {
    data(){
        return{
            leagues: null,
            loading: null,
            withGuessesModel: false
        }
    },
    async mounted(){
       await this.getNeedData();
    },
    methods:{
        async getNeedData(){
            this.loading= true;
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET_NEED_DATA + 
                (this.withGuessesModel ? '?withGuesses=1' : '')
            );
            if(response && response.status === "success"){
                this.leagues = response.message;
            }
            this.loading = false;
        },
    }
}
</script>