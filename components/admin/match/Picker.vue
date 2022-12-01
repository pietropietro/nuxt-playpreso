<template>
    <v-container>
        <v-row align="center">
            <admin-select-p-p-tournament-type :model="ppTTselected" :setPPtt="(val)=>ppTTselected=val"/>
            <div @click="testPick" :disabled="!ppTTselected">TEST PICK</div>
        </v-row>
        <loading-page v-if="loading"/>
        <template v-else>
            <v-row>
                <v-col v-for="league in leagues" :key="league.id">{{league.name}}</v-col>
            </v-row>
            <v-expansion-panels class="py-4">
                <v-row v-if="picked.length > 0">
                    <v-col v-for="match in picked" :key="match.id" >
                        <admin-match-expansion-panel :match="match"/>
                    </v-col>
                </v-row>
                <v-row v-else-if="called" justify="center" class="py-5">
                    <b>no matches found</b>
                </v-row>
            </v-expansion-panels>
        </template>
    </v-container>
</template>
<script>
export default {
    data:()=>({ppTTselected:null, loading:false, picked:[], leagues: [], called: false}),
    methods:{
        async testPick(){
            this.loading=true;
            let response = await this.$api.call(this.ADMIN_API_ROUTES.MATCH.PICK + this.ppTTselected);
            if(response && response.status === "success"){
                this.picked = response.message.matches;
                this.leagues = response.message.leagues;
            }
            this.called=true;
            this.loading = false;
        },
    }
}
</script>