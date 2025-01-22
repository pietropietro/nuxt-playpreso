<template>
    <div>
        <v-row no-gutters justify="center" align="center" class="mx-2">
            <v-col>
                <guess-box-view
                    :match="flashPPRM.match || flashPPRM.guess?.match"
                    :guess="flashPPRM.guess"
                    :rgb="flashPPRM.guess.ppTournamentType.rgb"
                    :open="openId && openId == flashPPRM.guess.id"
                    :setOpen="(val)=>openId=val"
                    :onUnlockedClick="onUnlockedClick"
                />
            </v-col>
            <v-col v-if=!openId>
                <v-row>
                    <v-col>
                        <p-p-info label="cost" :value="flashPPRM.lock_cost" small/>
                    </v-col>
                    <v-col>
                        <p-p-info label="prize" :value="
                            flashPPRM.guess.winner_prize ??
                            flashPPRM.lock_cost * flashPPRM.guesses.length" small/>
                    </v-col>
                </v-row>
                <v-row justify="center">
                    <slot name="row2" />
                </v-row>
            </v-col>
        </v-row>
        <v-row class="pt-2" justify="center" no-gutters v-if="flashPPRM.guesses">
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
                            :flip="()=>flipped=!flipped"
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
        onUnlockedClick: {type: Function}
    },
    data(){
        return{
            openId: null,
            flipped: false
        }
    },
    mounted(){
        console.log('mounted blueprint, flash:', this.flashPPRM);
    }
}
</script>