<template>
    <v-container>
        <div v-for="section, tournamentType in ppDex" :key="tournamentType" class="mt-4">
            <v-row v-for="(pptUp, ppttName) in section" :key="ppttName" align="center">
                <v-col cols="2">
                    <div class="overline lh-1">{{ ppttName }}</div>
                </v-col>
                <v-col class="text-center">
                    <v-row align="center" class="ml-2">
                        <v-col cols="3" v-for="level in pptUp" :key="level.ppTournamentType?.id">
                            <!-- NO PARTICIPATION -->
                            <div class="overline lh-1 font-weight-bold" v-if="!level.userParticipation.updated_at">
                                –
                            </div>
                            <div v-else-if="level.userParticipation.is_live" 
                                class="pa-1 blink red rounded-circle d-inline-block"
                            />           
                            <div
                                @click="!level.userParticipation.position ? null : selectId(level.ppTournamentType?.id)"
                                v-else-if="level.ppTournamentType?.id != selectedPPTTId"
                            >
                                
                                <div class="overline lh-1 font-weight-bold" v-if="level.userParticipation.position != 1">
                                    {{ level.userParticipation.position }}°
                                </div>
                                <em-emoji v-else
                                    size="2em"
                                    class="pointer"
                                    :native="level.ppTournamentType.emoji"
                                />
                            </div>
                            <div class="overline lh-1"
                                v-else-if="!clickGo && level.ppTournamentType?.id == selectedPPTTId"
                                @click="selectId(level.ppTournamentType?.id)"
                            >
                                {{ formatMonthYear(level.userParticipation?.updated_at, 'short') }}
                            </div>
                            <nuxt-link class="no-decoration" :to="linkTo(level)"  v-else>
                                <h4 class="">
                                    GO
                                </h4>
                            </nuxt-link>
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
            return '/'
            // check is cup
            // let route = level.ppCup_id ? 
            //     (ROUTES.PPCUP.DETAIL + trophy.ppCup_id) : 
            //     (ROUTES.PPLEAGUE.DETAIL + trophy.ppLeague_id)
            // return route
        }
    }
}
</script>