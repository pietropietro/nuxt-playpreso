<template>
    <v-container fluid  >
        <v-row :style="'background-color: ' + (participation.ppLeague_id ? ' var(--v-pleague-base)' : 'var(--v-pcup-base)') ">
            <div class="pl-2 overline" style="line-height:1rem;">
                {{participation.ppLeague_id ? 'P-LEAGUE' : 'P-CUP'}}
            </div>
        </v-row>
        <v-row align="center">
            <v-col>
                <h2>{{ppTournamentTypeTitle(participation.ppTournamentType)}}</h2>
            </v-col>
        </v-row>   
        <v-row v-if="!participation.started"  class="px-2">
            <div class="text-overline">NOT STARTED</div>
        </v-row>
        <v-row v-else-if="participation.finished" class="px-2">
            <div class="text-overline">FINISHED</div>
        </v-row>     
        <template v-else>
            <v-row>
                <v-col>
                    <v-row class="overline">
                        <span class="mr-2">POSITION</span>
                        <h1>{{participation.position ? participation.position + '°' : '?'}}</h1>
                        <span>/{{participation.user_count}}</span>
                    </v-row>
                    <!-- <p-p-info small :label="$t('app.position')"
                        :value="participation.position ?? '?'"
                        :value2="participation.user_count"
                    /> -->
                </v-col>
                <v-col class="overline lh-1">
                    <div>
                        ROUND {{participation.currentRound}}/{{participation.rounds}} 
                    </div>
                    <div v-if="participation.playedInCurrentRound">
                        PLAYED {{participation.playedInCurrentRound[0]}}/{{participation.playedInCurrentRound[1]}}
                    </div>
                </v-col>
                <!-- <v-col v-if="participation.unlocked">
                    <v-row justify="center" style="height:100%">
                        <h3>{{participation.unlocked}} UNLOCKED</h3>
                    </v-row>
                </v-col> -->
            </v-row>
            <v-row>
                <v-col cols="auto" v-if="participation.nextMatch">
                    <v-row align="center">
                        <v-col cols="auto">
                            <div class="overline lh-1">next<br>match</div>
                        </v-col>
                        <v-col class="lh-1">
                            <h4>{{participation.nextMatch.homeTeam.name}}</h4>
                            <h4>{{participation.nextMatch.awayTeam.name}}</h4>                        
                        </v-col>
                    </v-row>
                    <v-row justify="center" no-gutters>
                        <div class="overline lh-1">{{formatDate(participation.nextMatch.date_start, true)}}</div>
                    </v-row>
                </v-col>
            </v-row>
        </template>
    </v-container>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
}
</script>
