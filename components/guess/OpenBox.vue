<template>
    <v-container v-if="guess && match">   
        <v-row
            class="rounded-lg"
            :style="{
                height: size,
                minWidth: size,
                overflow: 'hidden'
            }"
        >   
            <v-col>
                <v-row>
                    <v-col cols="2">
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
                                    <em-emoji
                                        :native="guess.ppTournamentType?.emoji"
                                        size="2em"
                                    />
                                </template>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col>
                        <v-row v-for="i in 2" :key="i"
                            align="center"
                            :style="{
                                height: size +'px',
                            }"
                        >
                            <v-col class="pa-0" style="height:100%">
                                <template v-if="i==1">
                                    <v-row v-for="j in 2" :key="j"
                                        justify="center"
                                        align="center"
                                        no-gutters
                                        :style="{height:'50%', background: j== 2 ? ppRGBA(rgb, 0.4) : ppRGBA(rgb, 0.2)}"
                                    >
                                        <div class="overline lh-1">
                                            {{ j==1 ? match.homeTeam.name : match.awayTeam.name }}
                                        </div>
                                    </v-row>
                                </template>
                                <template v-if="i==2" >
                                    <v-row align="center" no-gutters style="height:100%">  
                                        <v-col class="pa-0" 
                                            :style="{background: ppRGBA(rgb, 0.2), height: '100%'}"
                                        >
                                            <v-row no-gutters align="center" justify="center" 
                                                style="height:100%; line-height: 0.8em;" class="ml-2 mr-1"
                                            >
                                                <div>
                                                    <span>
                                                        <emoji-flag
                                                            :model="match.league.country"
                                                            size="1em"
                                                            class="mr-1"
                                                            style="line-height: 0.3em !important;"
                                                        />
                                                    </span>
                                                    <span
                                                        class="overline"
                                                        style="line-height: 0.3em !important;"
                                                        v-if="match.league.parent"
                                                    >
                                                        {{ match.league.parent.name }}
                                                    </span>
                                                    <span
                                                    style="line-height: 0.3em !important;"
                                                        class="overline"
                                                    >
                                                        {{ match.league.name }}
                                                    
                                                    </span>
                                                </div>                                          
                                         </v-row>

                                        </v-col>
                                        <v-col cols="auto"
                                            :style="{background: ppRGBA(rgb, 0.4), height: '100%'}"
                                        >
                                            <v-row no-gutters align="center" style="height:100%">
                                                <v-col cols="auto" class="pl-2"
                                                >
                                                    <guess-box-time :match="match"/>
                                                </v-col>
                                                <v-col cols="auto" class="px-2">
                                                    <guess-match-result :guess="guess" :match="match" />
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="2">
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
                                        <guess-single-view-points :guess="guess" />
                                        <!-- <guess-match-result :guess="guess" :match="match" /> -->
                                    </template>
                                </div>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        guess: {type: Object, required: true},
        match: {type: Object, required: true},
        rgb: {type: String},
        size: {type: Number, default: 49},
        setOpen: {type: Function}
    },
    methods:{
        handleClick(){
            console.log('set open null');
            this.setOpen(null);
        }
    }
}
</script>