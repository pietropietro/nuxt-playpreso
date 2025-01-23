<template>
    <div>
        <v-row no-gutters justify="center" align="center" class="mx-2">
            <v-col>
                <guess-box-view
                    :match="flashPPRM.match || flashPPRM.guess?.match"
                    :guess="flashPPRM.guess"
                    :rgb="flashPPRM.guess.ppTournamentType.rgb"
                    :open="verified || (openId && openId == flashPPRM.guess.id)"
                    :setOpen="(val)=>openId=val"
                    :onUnlockedClick="onUnlockedClick"
                />
            </v-col>
            <v-col v-if="!openId && !verified">
                <v-row>
                    <v-col>
                        <p-p-info label="cost" :value="flashPPRM.lock_cost" value2="🅿️" small/>
                    </v-col>
                    <v-col>
                        <p-p-info label="jackpot" :value="
                            flashPPRM.guess.winner_prize  ??
                            (flashPPRM.lock_cost * flashPPRM.guesses.length)" value2="🅿️" small/>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <slot name="row2" />
                </v-row>
            </v-col>
        </v-row>
        <v-row justify="center" no-gutters v-if="flashPPRM.guesses">
            <v-slide-group
                        class="px-2"
                        :show-arrows="!$vuetify.breakpoint.xs"
                        prev-icon="<"
                        next-icon=">"
                        :style="{ height: '80px'}"
                    >
                <v-slide-item v-for="(guess,index) in flashPPRM.guesses" :key="index">
                    <div class="h-100 mx-4">
                        <guess-info
                            :color="ppRGBA(flashPPRM.guess.ppTournamentType.rgb)"
                            :guess="guess"
                            :flipped="flipped"
                            :flip="flip"
                            :started="flashPPRM.match.live ? true : false"
                        />
                    </div>
                </v-slide-item>
            </v-slide-group>
        </v-row>
    </div>
</template>
<script>
export default{
    props:{
        flashPPRM: {type: Object, required:true},
        onUnlockedClick: {type: Function},
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
            if(!this.flashPPRM.match.verified_at)return;
            this.flipped = !this.flipped;
        }
    },
    mounted(){
        if(!this.flashPPRM.match.verified_at) this.flipped = true;
    }
}
</script>