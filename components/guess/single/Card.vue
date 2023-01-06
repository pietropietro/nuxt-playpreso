<template>
    <!-- <v-card flat v-if="guess" :class="match.score_home !== null ? 'white--text':''"> -->
    <v-container v-if="guess">
        <v-row class="rounded-tl-xl rounded-tr-xl"
            :style="'height:10px; background-color: var(--v-pcup-base)' "
        />
        <v-row>
            <v-container class="pa-0">
                <v-row no-gutters>
                    <v-col
                        :style="'background-color: var(--v-pcup-lighten5)'"
                    >
                        <v-container class="pa-2">
                            <match-info-short :match="match"/>
                        </v-container>
                    </v-col>
                    <v-col v-if="guess.guessed_at || guess.verified" 
                        class="overline lh-1" 
                    >
                        <v-container 
                            fill-height
                            class="py-0"
                        >
                            <template v-if="guess.guessed_at">
                                <!-- <v-row
                                class="mt-0"
                                 :style="'background-color: var(--v-pcup-lighten2)'"
                                >
                                    <v-col>1</v-col>
                                    <v-col>UND</v-col>
                                    <v-col>GOL</v-col>
                                </v-row> -->
                                <v-row
                                 :style="'height:100%; background-color: var(--v-pcup-lighten4)'"
                                >
                                    <v-container fill-height>
                                        <v-row>LOCKED {{guess.home}} - {{guess.away}}</v-row>
                                        <v-row class="py-1">MATCH
                                            <template v-if="match.verified_at">{{match.score_home}} - {{match.score_away}}</template>
                                            <template v-else>?</template>
                                        </v-row>
                                    </v-container>
                                </v-row>
                            </template>
                            <template v-else>MISSED</template>
                        </v-container>
                    </v-col>
                </v-row>

                
                <template v-if="!guess.guessed_at && !guess.verified_at && match.score_home === null">
                    <guess-single-picker
                        class="no-gutters"
                        :guess="guess"
                        :style="'background-color: ' + ppRGBA($store.state.navigation.rgb, .2)"
                    />
                    <guess-single-bottom-action
                        :style="'background-color: ' + ppRGBA($store.state.navigation.rgb)"
                        :guess="guess"
                        :onclick="lockGuess"
                    />
                </template>
            </v-container>
        </v-row>
    </v-container>
    <error-wall v-else/>
</template>
<script>
export default {
    props:{
        guess: {type: Object, required: true},
        match: {type: Object, required: true},
    },
    data(){
        return{
            lockButtonLoading: false
        }
    },
    computed:{
        statusAlpha(){
            if(this.match.score_home !== null) return 1;
            if(this.guess.guessed_at) return 0.6;
            return 0.2;
        }
    },
    methods:{
        async lockGuess(){
            this.lockButtonLoading = true;
            let home = this.guess.home ?? 0;
            let away = this.guess.away ?? 0;
      
            let values = { 
                "home": home,
                "away": away
            }
            
            let response = await this.$api.call(
                this.API_ROUTES.GUESS.LOCK + this.guess.id, values, 'POST'
            );

            if(response && response.status === "success"){
                this.guess.guessed_at = new Date();
                this.guess.home = home;
                this.guess.away = away;
            }
            this.lockButtonLoading = false;
        }
    }
}
</script>