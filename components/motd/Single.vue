<template>
    <div>
        <v-row justify="center" align="center">
            <v-col>
                <div style="min-width:250px; max-width:300px;">
                    <guess-single-card
                        :match="motd.match"
                        :guess="motd.guess"
                        :afterLock="afterLock"
                        :rgb="motdPPTT.rgb"
                        :selectedGuessId="selectedGuessId"
                        :setSelectedGuessId="(val)=>selectedGuessId = val"
                        extended
                    />
                </div>
            </v-col>
            <v-col class="text-center">
                <h1>{{motd.aggr_count}}</h1>
                <div class="overline lh-1">locks</div>
            </v-col>
        </v-row>
        <v-row v-if="motd.stats" class="py-5 text-center">
            <v-col cols="4">
                <v-row no-gutters justify="center">
                    <h3>{{motd.stats.most_locked?.result}}</h3>
                    <h6>({{motd.stats.most_locked?.occurrances}})</h6>
                </v-row>
                <div class="overline lh-1">most <em-emoji id="lock"/></div>
            </v-col>
            <v-col cols="4">
                <h3>{{motd.stats.preso_count}}</h3>
                <div class="overline lh-1">PRESO</div>

            </v-col>
            <v-col cols="4">
                <h3>{{motd.stats.points_avg}}</h3>
                <div class="overline lh-1">AVG</div>

            </v-col>
        </v-row>
        <div v-else class="my-6 mb-md-0">
                <v-sparkline
                    class="ocrastd"
                    padding="12"
                    :value="userLast.points"
                    :labels="userLast.points"
                    :color="'rgba('+motdPPTT.rgb+')'"
                    height="60"
                    stroke-linecap="round"
                    smooth
                />
            <!-- <v-row no-gutters>
                <v-col cols="2" v-for="(e,i) in userLast.teams" :key="i">
                    <div v-html="e" 
                        class="text-center text-uppercase ocrastd"
                        :style="{
                            lineHeight:1,
                            fontSize:'10px'
                        }"
                    />
                </v-col>
            </v-row> -->
        </div>
    </div>
</template>
<script>
export default {
    props:{
        motd: {type: Object},
        motdPPTT: {type: Object},
        userLast: {type: Object}
    },
    data(){
        return{
            selectedGuessId: (this.motd.guess?.id ?? 1)
        }
    },
    methods:{
        afterLock(lockedGuess){
            this.motd.guess=lockedGuess;
            this.motd.aggr_count ++;
        }
    },
}
</script>