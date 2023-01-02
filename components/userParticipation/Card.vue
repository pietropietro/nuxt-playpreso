<template>
        <v-container>
            <v-row class="rounded-tl-xl rounded-tr-xl"
                :style="'height:10px; background-color: ' + (participation.ppLeague_id ? ' var(--v-pleague-base)' : 'var(--v-pcup-base)') "
            />
            <v-row align="center"
                :style="'background-color: ' + (participation.ppLeague_id ? ' var(--v-pleague-lighten2)' : 'var(--v-pcup-lighten2)') "
            >
                <v-col class="py-1">
                    <div class="overline" style="line-height:1rem;">
                        {{participation.ppLeague_id ? 'P-LEAGUE' : 'P-CUP'}}
                    </div>
                    <h2>{{ppTournamentTypeTitle(participation.ppTournamentType)}}</h2>
                </v-col>
                <v-col class="py-1" cols="auto">
                    <div v-if="!participation.started"  class="text-overline">NOT STARTED</div>
                    <template v-else>
                        <span class="overline">POS.</span>
                        <v-row>
                            <h1>{{participation.position ? participation.position + '°' : '?'}}</h1>
                            <span class="overline" style="line-height:4rem" >/{{participation.user_count}}</span>
                        </v-row>
                    </template>
                </v-col>
            </v-row>
            <v-row v-if="participation.started">
                <v-col>
                    <template v-if="participation.nextMatch">
                        <v-row >
                            <v-col cols="auto">
                                <div class="overline lh-1">next<br>match</div>
                            </v-col>
                            <v-col class="lh-1">
                                <p-p-emoji :model="participation.nextMatch.league?.country" />
                                <span class="overline lh-1">{{participation.nextMatch.league.tag}}</span>
                                            
                                <h4>{{participation.nextMatch.homeTeam?.name}}</h4>
                                <h4>{{participation.nextMatch.awayTeam?.name}}</h4>
                                <div class="overline lh-1">{{formatDate(participation.nextMatch.date_start, true)}}</div>
                            </v-col>
                        </v-row>
                        <!-- <v-row justify="center" no-gutters>
                            <div class="overline lh-1">{{formatDate(participation.nextMatch.date_start, true)}}</div>
                        </v-row> -->
                    </template>
                </v-col>
                <v-col cols="auto" class="overline lh-1">
                    R {{participation.currentRound}}/{{participation.rounds}}
                    <template v-if="participation.playedInCurrentRound">
                        P {{participation.playedInCurrentRound[0]}}/{{participation.playedInCurrentRound[1]}}
                    </template>
                </v-col>
            </v-row>
        </v-container>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
   
}
</script>
