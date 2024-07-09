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
                    <v-col cols="auto">
                        <v-row v-for="i in 2" :key="i"
                            align="center"
                            justify="center"
                            class="text-center"
                            :style="{
                                height: size +'px',
                                background: i== 2 ? ppRGBA(rgb, shade1) : ppRGBA(rgb, shade2)
                            }"
                        >
                            <v-col class="pa-0" style="min-width:49px;">
                                <team-logo v-if="i==1"
                                    :id="match.homeTeam.id"
                                    :name="match.homeTeam.name"
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
                                        :style="{height:'50%', background: j== 2 ? ppRGBA(rgb, shade1) : ppRGBA(rgb, shade2)}"
                                    >
                                        <div class="ocrastd lh-1 font-weight-bold" style="font-size:14px">
                                            {{ j==1 ? match.homeTeam.name : match.awayTeam.name }}
                                        </div>
                                    </v-row>
                                </template>
                                <template v-if="i==2" >
                                    <v-row align="center" no-gutters style="height:100%">  
                                        <v-col class="pa-0" 
                                            :style="{background: ppRGBA(rgb, shade2), height: '100%'}"
                                        >
                                            <v-row no-gutters align="center" justify="center" 
                                                style="height:100%; line-height: 0.8em;" class="ml-2 mr-1"
                                            >
                                                <div style="word-break: break-all;">
                                                    <span>
                                                        <emoji-flag
                                                            :model="match.league.country"
                                                            size="1em"
                                                            style="line-height: 0.3em !important; margin-right:2px"
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
                                            :style="{background: ppRGBA(rgb, shade1), height: '100%'}"
                                        >
                                            <v-row no-gutters align="center" style="height:100%">
                                                <v-col cols="auto" class="px-2"
                                                    v-if="!guess.verified_at && match.verified_at"
                                                >
                                                    <guess-box-time :match="match" :guess="guess"/>
                                                </v-col>
                                                <v-col cols="auto" class="pr-2">
                                                    <guess-match-result :guess="guess" :match="match" />
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>
                                </template>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="auto">
                        <v-row v-for="i in 2" :key="i"
                            align="center"
                            justify="center"
                            class="text-center"
                            :style="{
                                height: size +'px',
                                background: i== 1 ? ppRGBA(rgb, shade1) : ppRGBA(rgb, shade2)
                            }"
                        >
                            <v-col class="pa-0" style="min-width:49px;">
                                <team-logo 
                                    v-if="i==1"
                                    :id="match.awayTeam.id"
                                    :name="match.awayTeam.name"
                                    size="30"
                                />
                                <template v-else>
                                    <div v-if="!guess.verified_at">
                                        <guess-box-time :match="match" :guess="guess"/>
                                    </div>
                                    <div class="text-center" v-else>
                                        <guess-single-view-points :guess="guess" />
                                    </div>
                                </template>
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
    },
    computed:{
        shade1(){
            return this.match.verified_at ? 0.4 : 0.6;
        },
        shade2(){
            return this.match.verified_at ? 0.2 : 0.4;
        }
    }
}
</script>