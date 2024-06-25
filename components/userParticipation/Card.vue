<template>
    <v-row  
        no-gutters
        class="rounded-lg my-10"
        align="center"
        :style="{
            maxHeight: '130px',
            minWidth: '30px',
            overflow: 'hidden',
        }"
    >
        <v-col>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-row no-gutters>
                        <v-col
                            :style="{
                                background:ppRGBA(up.ppTournamentType.rgb,1),
                                minHeight: '60px'
                            }"
                        >
                            <v-row no-gutters align="end" class="pl-4" style="height: 60px;">
                                <h1>
                                    {{ppTournamentTypeTitle(up.ppTournamentType)}}
                                </h1>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" class="text-center" v-if="status== 'active'">
                    <v-row no-gutters align="center">
                        <v-col
                            :style="{background:ppRGBA(up.ppTournamentType.rgb,0.6)}"
                        >
                            <div class="overline">
                                POS. {{up.position ? up.position + '°' : '?'}}/
                                {{up.ppTournamentType.participants ??
                                    up.levelFormat.group_participants
                                }}
                            </div>
                        </v-col>
                        <v-col
                            :style="{background:ppRGBA(up.ppTournamentType.rgb,0.8)}"
                
                        >
                            <div class="overline">
                                R {{up.currentRound}}/{{up.rounds ?? up.levelFormat.rounds}}
                                P {{up.playedInCurrentRound[0]}}/{{up.playedInCurrentRound[1]}}
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" class="text-center" v-else-if="status== 'waiting'">
                    <v-row no-gutters align="center">
                        <v-col
                            :style="{background:ppRGBA(up.ppTournamentType.rgb,0.6)}"
                        >
                            <div class="overline">
                                <template v-if="!up.started"  >
                                       waiting for {{(up.ppTournamentType.participants - up.user_count)}} {{ up.ppTournamentType.participants - up.user_count > 1 ? 'users' : 'user'}}
                                </template>
                                <template v-else>
                                    waiting for matches
                                </template>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col cols="12" class="text-center" v-else-if="status == 'finished'">
                    <v-row no-gutters align="center">
                        <v-col
                            :style="{background:ppRGBA(up.ppTournamentType.rgb,0.6)}"
                        >
                            <div class="overline">
                                <template v-if="up.position==1">winner</template>
                                <template v-else>
                                    POS. {{up.position}}°/
                                    {{up.ppTournamentType.participants ??
                                        up.levelFormat.group_participants
                                    }}
                                </template>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="4"
            :style="{background:ppRGBA(up.ppTournamentType.rgb,0.4)}"
        >
            <v-row no-gutters justify="center" align="center" 
                :style="{
                    background: 'linear-gradient(rgb(' + up.ppTournamentType.rgb + '), transparent)',  
                    minHeight: '92px'
                }"
            >
                <em-emoji
                    :style="{fontSize:'20px', position: 'absolute'}"
                    :native="up.ppTournamentType.emoji" size="4em"
                />
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        up: {type: Object, required: true},
        status: {type: String, required: true},
    },
}
</script>
