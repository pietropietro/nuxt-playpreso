<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="!selectedPPCupGroupId">
        <v-row>
            <v-col>
                <h1>
                   #{{ ppCup.id }} {{ ppTournamentTypeTitle(ppCup.ppTournamentType) }}
                </h1>
                <h4>slug: {{ ppCup.slug }}</h4>
            </v-col>
            <v-col cols="auto">
                <v-btn icon  
                    @click="close"
                >
                    <h1>X</h1>
                </v-btn>
            </v-col>
        </v-row>
        <v-row
            v-for="(level,i) in ppCup.levels"
            :key="i"

        >
            <v-col
                v-for="group in level"
                :key="group.id"
            >
                <v-card color="primary" @click="()=>selectedPPCupGroupId=group.id">
                    <v-container>
                        <v-row>
                            <h4>{{ cupGroupStageString(group, ppCup.ppTournamentType.cup_format) }}</h4>
                        </v-row>
                        <v-row class="caption">
                            #{{group.id}} 
                        </v-row>
                        <v-row class="caption">
                            <b>u: </b>{{ group.userParticipations.length }} / {{ group.participants }}
                        </v-row>
                        <v-row><b>started:</b> <em-emoji :id="!!group.started_at ? 'white_check_mark' :'x'"/></v-row>
                        <v-row><b>finished:</b> <em-emoji :id="!!group.finished_at ? 'white_check_mark' :'x'"/></v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <admin-p-p-cup-group-detail v-else :id="selectedPPCupGroupId" :close="()=>selectedPPCupGroupId = null"/>
</template>
<script>
export default {
    props:{
        id: {type: Number},
        close: {type: Function}
    },
    data:()=>({
        loading: true, 
        ppCup: null, 
        selectedPPCupGroupId: null
    }),
    async mounted(){
        await this.getPPCup();
    },
    methods:{
        async getPPCup(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.PPCUP.GET + '/' + this.id);
            if(response && response.status === "success"){
                this.ppCup = response.message;
            }
            this.loading = false;
        },
    }
}
</script>