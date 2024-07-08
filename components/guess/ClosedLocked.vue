<template>
    <v-row>
        <v-col>
            <v-row v-for="i in 2" :key="i"
                align="center"
                justify="center"
                class="text-center"
                :style="{
                    height: size +'px',
                    background: i== 2 ? ppRGBA(rgb) : ppRGBA(rgb, 0.6)
                }"
            >
                <v-col class="pa-0">
                    <team-logo v-if="i==1"
                        :id="match.homeTeam.id"
                        size="30"
                    />
                    <template v-if="i==2" >
                        <em-emoji  
                            v-if="thirdCell == 'emoji'"
                            :native="guess.ppTournamentType?.emoji" 
                            size="2em"
                        />
                        <template v-else>
                            <guess-box-time :match="match"/>
                        </template>
                    </template>
                </v-col>
            </v-row>
        </v-col>
        <v-col>
            <v-row v-for="i in 2" :key="i"
                align="center"
                justify="center"
                class="text-center"
                :style="{
                    height: size +'px',
                    background: i== 1 ? ppRGBA(rgb) : ppRGBA(rgb, 0.6)
                }"
            >
            
                <v-col class="pa-0">
                    <team-logo v-if="i==1"
                        :id="match.awayTeam.id"
                        size="30"
                    />
                    <v-row v-else no-gutters class="lh-1">
                        <v-col cols="12">
                            <em-emoji id="lock" v-if="i==2" size="1em"/>
                        </v-col>
                        <v-col class="pt-1">
                            <v-row no-gutters justify="center" align="center">
                                <select-integer
                                    @click.native.stop
                                    justify="end"
                                    :disabled="true"
                                    :model="guess.home"
                                    :setModel="null"
                                    small
                                />
                                <v-col cols="auto">
                                    <h4 class="text-center" style="user-select: none;">-</h4>
                                </v-col>
                                <select-integer
                                    @click.native.stop
                                    justify="start"
                                    :disabled="true"
                                    :model="guess.away"
                                    :setModel="null"
                                    small
                                />
                            </v-row>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>

export default {
    props:{
        match: {type: Object},
        guess: {type: Object},
        rgb: {type: String},
        size: {type: Number, default: 49},
        withLogo: {type:Boolean, default: true},
        thirdCell: {type: String, default: 'emoji'}
    },
}
</script>