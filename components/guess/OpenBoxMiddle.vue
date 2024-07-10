<template >
    <div>
        <v-row  v-for="i in 2" :key="i"
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
                        <v-col class="pa-0" cols="9"
                            :style="{background: ppRGBA(rgb, shade2), height: '100%'}"
                        >
                            <v-row no-gutters style="height:50%" align="center" justify="center" class="text-center">
                                <v-col cols="3">
                                    <emoji-flag
                                        :model="match.league.country"
                                        size="1em"
                                        style="line-height: 0.3em !important; margin-right:2px"
                                    />
                                </v-col>
                                <v-col>
                                    <div class="overline lh-1">lvl {{ match.league.level }}</div>
                                </v-col>
                                <v-col cols="4" class="overline lh-1">
                                    R {{ match.round }}
                                </v-col>
                            </v-row>
                            <league-row :league="match.league"/>
                        </v-col>
                        <v-col cols="3"
                            :style="{background: ppRGBA(rgb, shade1), height: '100%'}"
                        >
                            <guess-match-result :guess="guess" :match="match" />
                        </v-col>
                    </v-row>
                </template>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        guess: {type: Object, required: true},
        match: {type: Object, required: true},
        rgb: {type: String},
        size: {type: Number, default: 49},
    },
    computed:{
        shade1(){
            return this.match.verified_at ? 0.4 : 0.6;
        },
        shade2(){
            return this.match.verified_at ? 0.2 : 0.4;
        }
    },
}
</script>