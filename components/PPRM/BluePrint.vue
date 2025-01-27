<template>
    <div>
        <v-row no-gutters justify="center" align="center" class="mx-2">
            <v-col>
                <guess-box-view
                    :match="pprm.match || pprm.guess?.match"
                    :guess="pprm.guess"
                    :rgb="pprm.guess.ppTournamentType.rgb"
                    :open="verified || (openId && openId == pprm.guess.id)"
                    :setOpen="(val)=>openId=val"
                    :onUnlockedClick="onUnlockedClick"
                />
            </v-col>
            <v-col v-if="!openId && !verified">
                <v-row class="pr-2">
                    <v-col>
                        <p-p-info label="cost" :value="pprm.lock_cost ?? 'FREE'" value2="🅿️" small/>
                    </v-col>
                    <v-col>
                        <p-p-info label="jackpot" :value="
                            pprm.guess.winner_prize  ??
                            ((pprm.lock_cost ?? 10) * pprm.guesses.length)" value2="🅿️" small/>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <h3 class="ocrastd" v-if="isValidDatetime(pprm.match.verified_at) &&  pprm.guess.guessed_at">{{pprm.guess.winner ? 'WIN!' : 'you lost'}}</h3>
                    <h3 class="ocrastd red--text" v-if="pprm.match.live">live</h3>
                    <h3 class="ocrastd" 
                        v-else-if="!pprm.guess.verified_at && !!onCountDownFinished"
                    >
                        <p-p-count-down
                            :until_datetime="pprm.match.date_start"
                            :onCountDownFinished="onCountDownFinished"
                        />
                    </h3>
                </v-row>
            </v-col>
        </v-row>
        <v-row justify="center" no-gutters v-if="pprm.guesses?.length > 0">
            <v-slide-group
                        class="px-2"
                        :show-arrows="!$vuetify.breakpoint.xs"
                        prev-icon="<"
                        next-icon=">"
                        :style="{ height: '80px'}"
                    >
                <v-slide-item v-for="(guess,index) in pprm.guesses" :key="index">
                    <div class="h-100 mx-4">
                        <guess-info
                            :color="ppRGBA(pprm.guess.ppTournamentType.rgb)"
                            :guess="guess"
                            :flipped="flipped"
                            :flip="flip"
                            :started="pprm.match.live ? true : false"
                        />
                    </div>
                </v-slide-item>
            </v-slide-group>
        </v-row> 
        <v-row v-else-if="isValidDatetime(pprm.match.verified_at)" justify="center" no-gutters class="pt-4 pb-8">
            <div class="caption">No locks for this event.</div>
        </v-row>
    </div>
</template>
<script>
export default{
    props:{
        pprm: {type: Object, required:true},
        onUnlockedClick: {type: Function},
        onCountDownFinished: {type: Function},
        verified: {type: Boolean}
    },
    data(){
        return{
            flipped:false,
            openId: null,
        }
    },
    methods:{
        flip(){
            if(!this.pprm.match.verified_at)return;
            this.flipped = !this.flipped;
        }
    },
    mounted(){
        if(!this.pprm.match.verified_at) this.flipped = true;
    }
}
</script>