<template>
    <v-container>
        <v-row class="rounded-lg"
            align="center"
            :style="'background-color: ' + ppRGBA(participation.ppTournamentType.rgb, 0.8)"
        >
            <!-- <v-col cols="auto" class="pr-2">
                <em-emoji v-if="participation.ppTournamentType.emoji" 
                    :native="participation.ppTournamentType.emoji" 
                    size="2rem"
                />
            </v-col> -->
            <v-col class="py-1">
                <v-chip label x-small class="oppositeText--text" :color="ppRGBA(participation.ppTournamentType.rgb)">
                    <div class="overline" style="line-height:1rem;">
                        {{participation.ppLeague_id ? 'P-LEAGUE' : 'P-CUP'}}
                    </div>
                </v-chip>
                <h2>
                    {{ppTournamentTypeTitle(participation.ppTournamentType)}}
                </h2>
            </v-col>
            <v-col class="py-1" cols="auto">
                <template v-if="!participation.started"  >
                    <v-row no-gutters justify="end" class="text-overline lh-1">
                        - {{(participation.ppTournamentType.participants - participation.user_count)}} users
                    </v-row>
                    <v-row no-gutters justify="end" class="text-overline lh-1">
                        NOT STARTED
                    </v-row>
                </template>
                <template v-else-if="participation.paused" >
                    <v-row no-gutters justify="end" class="text-overline lh-1" v-if="participation.position">
                        POS. {{participation.position}}°/{{participation.ppTournamentType.participants}}
                    </v-row>
                    <v-row no-gutters class="text-overline lh-1">waiting matches</v-row>
                </template>
                <div v-else class="mr-2">
                    <span class="overline">POS.</span>
                    <v-row>
                        <h1>{{participation.position ? participation.position + '°' : '?'}}</h1>
                        <span class="overline" style="line-height:4rem" >/{{participation.ppTournamentType.participants}}</span>
                    </v-row>
                </div>
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
            <v-col cols="auto">
                <p-p-round-row-recap 
                    :currentRound="participation.currentRound" :rounds="participation.rounds"
                    :playedInCurrentRound="participation.playedInCurrentRound"
                />
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
