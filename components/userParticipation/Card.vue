<template>
    <p-p-card :color="participation.ppLeague_id ? ' var(--v-pleague-base)' : 'var(--v-pcup-base)'">
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
                        <v-col>
                            <match-info-short :match="participation.nextMatch" />
                        </v-col>
                    </v-row>
                </template>
            </v-col>
            <v-col cols="auto" class="overline lh-1">
                R {{participation.currentRound}}/{{participation.rounds}}
                <template v-if="participation.playedInCurrentRound">
                    P {{participation.playedInCurrentRound[0]}}/{{participation.playedInCurrentRound[1]}}
                </template>
            </v-col>
        </v-row>
    </p-p-card>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
   
}
</script>
