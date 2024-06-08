<template>
    <v-row>
        <v-col>
            <v-row v-for="i in 2" :key="i"
                align="center"
                justify="center"
                class="text-center"
                :style="{
                    height: size +'px',
                    background: i== 2 ? ppRGBA(rgb, 0.4) : ppRGBA(rgb, 0.2)
                }"
            >
                <v-col class="pa-0">
                    <team-logo v-if="i==1"
                        :id="match.homeTeam.id"
                        size="30"
                    />
                    <template v-if="i==2" >
                        <guess-single-view-points :guess="guess" />
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
                    background: i== 1 ? ppRGBA(rgb, 0.4) : ppRGBA(rgb, 0.2)
                }"
            >
            
                <v-col class="pa-0">
                    <team-logo v-if="i==1"
                        :id="match.awayTeam.id"
                        size="30"
                    />
                    <div class="text-center" v-else>
                        <!-- MISSED -->
                        <template v-if="!guess.guessed_at">
                            <v-row no-gutters class="lh-1">
                                <v-col cols="12">
                                    <em-emoji id="checkered_flag"/>
                                </v-col>
                                <v-col no-gutters justify="center" class="lh-1 pt-1">
                                    <h4>{{ match.score_home  }}-{{ match.score_away }}</h4>
                                </v-col>
                            </v-row>
                        </template>
                        <!-- NOT MISSED -->
                        <template v-else>
                            <v-row no-gutters justify="center" align="center" class="ml-1 lh-1" v-if="guess.guessed_at">
                                <v-col cols="auto">
                                    <em-emoji id="lock"  size="0.6em"/>
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
                                        <v-col cols="auto" 
                                            :style="guess.home==3 ? 'margin-left:-2px' : '' "
                                        >
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
                                </v-col>                            </v-row>
                            <v-row no-gutters justify="center" class="lh-1 ml-1" align="center">
                                <v-col cols="auto">
                                    <em-emoji id="checkered_flag" size="0.6em"/>
                                </v-col>
                                <v-col>
                                    <h4>{{ match.score_home  }}-{{ match.score_away }}</h4>
                                </v-col>
                            </v-row>
                        </template>
                    </div>
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
    },
}
</script>