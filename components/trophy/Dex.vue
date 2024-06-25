<template>
    <v-container>
        <div v-for="section, tournamentType in ppDex" :key="tournamentType">
            <v-row v-for="(pptUp, ppttName) in section" :key="ppttName" align="center">
                <v-col cols="2">
                    <div class="overline lh-1">{{ ppttName }}</div>
                </v-col>
                <v-col class="text-center">
                    <v-row align="center" class="ml-2">
                        <v-col v-for="level in pptUp" :key="level.ppTournamentType?.id"
                            :cols="level.ppTournamentType.is_cup ? '8' : '3'"
                        >
                            <!-- NO PARTICIPATION -->
                            <div class="overline lh-1 font-weight-bold" v-if="!level.userParticipation.updated_at">
                                –
                            </div>
                            <!-- PARTICIPATION -->
                            <div v-else
                                @click="selectId(level.ppTournamentType?.id)"
                            >
                                <!-- SELECTED PARTICIPATION -->
                                <template v-if="level.ppTournamentType?.id == selectedPPTTId">
                                    <div class="overline lh-1" v-if="!clickGo">
                                        {{ formatMonthYear(level.userParticipation?.updated_at, 'short') }}
                                    </div>
                                    <nuxt-link :to="linkTo(level)"  v-else>
                                            <h4 class="">
                                                GO
                                            </h4>
                                        </nuxt-link>
                                </template>
                                <!-- NOT SELECTED -->
                                <template v-else>
                                    <div v-if="level.userParticipation.is_live"
                                        class="pa-1 blink red rounded-circle d-inline-block"
                                    />
                                    <div v-else-if="level.userParticipation.reached_level_string && level.userParticipation.position != 1"
                                        class="overline lh-1"
                                    >
                                        {{ level.userParticipation.reached_level_string }}
                                    </div>
                                    <div
                                        v-else-if="level.ppTournamentType?.id != selectedPPTTId"
                                    >
                                    
                                        <div class="overline lh-1 font-weight-bold" v-if="level.userParticipation.position != 1">
                                            {{ level.userParticipation.position }}°
                                        </div>
                                        <em-emoji v-else
                                            size="2.5em"
                                            class="pointer"
                                            :native="level.ppTournamentType.emoji"
                                        />
                                    </div>
                                </template>
                            </div>
                           
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </div>
    </v-container>
</template>
<script>
export default {
    props:{
        ppDex: {type: Object}
    },
    data(){
        return{
            loading: true,
            selectedPPTTId: null,
            clickGo: false
        }
    },
    methods:{
        selectId(id){
            if(this.clickGo){
                this.clickGo = false;
                this.selectedPPTTId = null;
                return;
            }
            if(this.selectedPPTTId != id){
                this.selectedPPTTId=id;
                return;
            }
            if(this.selectedPPTTId == id){
                this.clickGo = true;
                // this.selectedPPTTId = null;
                return;
            }
        },
        linkTo(level){
            // check is cup
            let route = level.ppTournamentType.is_cup ? 
                (this.ROUTES.PPCUP.DETAIL + level.userParticipation.ppCup_id + '/' + level.userParticipation.ppCupGroup_id) : 
                (this.ROUTES.PPLEAGUE.DETAIL + level.userParticipation.ppLeague_id)
            return route
        }
    }
}
</script>