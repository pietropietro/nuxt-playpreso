<template>
    <loading-page v-if="loading"/>
    <v-container fluid v-else>
        <v-row no-gutters>
            <v-col>
                <h1>
                    {{ ppTournamentTypeTitle(ppCupGroup.ppTournamentType) }} > {{ cupGroupStageString(ppCupGroup, ppCupGroup.ppTournamentType.cup_format) }}
                </h1>
            </v-col>
            <v-col cols="auto">
                <v-btn icon  
                    @click="close"
                >
                    <h1>X</h1>
                </v-btn>
            </v-col>
            <v-col cols="12">
                <h4>p-cup-group #{{ ppCupGroup.id }}</h4>
            </v-col>
        </v-row>
        <v-row >
            <v-card width="100%" color="primary">
                <v-container>
                    <v-row class="caption">
                            <v-col><b>u: </b>{{ ppCupGroup.userParticipations.length }} / {{ ppCupGroup.participants }}</v-col>
                    </v-row>
                    <v-row><v-col><b>started:</b> <em-emoji :id="!!ppCupGroup.started_at ? 'white_check_mark' :'x'"/></v-col></v-row>
                    <v-row><v-col><b>finished:</b> <em-emoji :id="!!ppCupGroup.finished_at ? 'white_check_mark' :'x'"/></v-col></v-row>
                    <admin-p-p-tournament-expansion-panels
                        tournamentColumn="ppCupGroup"
                        :tournamentId="ppCupGroup.id"
                        :userParticipations="ppCupGroup.userParticipations"
                        :lastPPRound="lastPPRound"
                        :onChange="getPPCupGroup"
                    />
                </v-container>
            </v-card>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        id: {type: Number},
        close: {type: Function}
    },
    data:()=>({
        loading: true, 
        ppCupGroup: null, 
        lastPPRound: null
    }),
    async mounted(){
        await this.getPPCupGroup();
    },
    methods:{
        async getPPCupGroup(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.PPCUPGROUP.GET + '/' + this.id);
            if(response && response.status === "success"){
                this.ppCupGroup = response.message;
                this.lastPPRound = [...this.ppCupGroup.ppRounds].pop();
            }
            this.loading = false;
        },
    }
}
</script>