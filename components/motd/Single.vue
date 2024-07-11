<template>
    <div>
        <v-row justify="center" align="center">
            <v-spacer/>
            <v-col cols="auto">
                <guess-box-view
                    :match="motd.match"
                    :guess="motd.guess"
                    :rgb="motdPPTT.rgb"
                    :afterLock="()=>null"
                    :onUnlockedClick="onSelect"
                />
            </v-col>
            <v-spacer/>
            <v-col class="text-center px-0">
                <h1>{{motd.aggr_count}}</h1>
                <div class="overline lh-1">locks</div>
            </v-col>
        </v-row>
        <v-row v-if="motd.stats && showStats" class="py-5 text-center">
            <v-col cols="4">
                <v-row no-gutters justify="center">
                    <h3>{{motd.stats.most_lock_combination}}</h3>
                    <h6>({{motd.stats.most_lock_combination_tot}})</h6>
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
        <!-- <div v-else class="my-6 mb-md-0">
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
        </div> -->
    </div>
</template>
<script>
export default {
    props:{
        motd: {type: Object},
        motdPPTT: {type: Object},
        userLast: {type: Object},
        showStats: {type: Boolean, default: false}
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
        },
        async onSelect(){
            if(this.motd.guess.guessed_at || this.motd.match.verified_at) return;
            await this.triggerHapticFeedback();
            console.log('passing', this.motd);
            this.motd.guess.match = this.motd.match;
            this.$store.dispatch('openGuesses/update', {
                newGuess: this.motd.guess,
                newList: [this.motd.guess], 
            });
        }
    },
}
</script>