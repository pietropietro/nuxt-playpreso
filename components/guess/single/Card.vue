<template>
    <!-- <v-card flat v-if="guess" :class="match.score_home !== null ? 'white--text':''"> -->
    <p-p-card color="var(--v-pcup-base)" v-if="guess">
        <v-row>
            <v-col
                :style="'background-color: var(--v-pcup-lighten5)'"
            >
                <match-info-short :match="match"/>
            </v-col>

            <v-col v-if="guess.guessed_at || guess.verified" 
                class="overline"  
            >
                <div style="height:100%">
                    <template v-if="guess.guessed_at">
                        <match-inner-values :home="guess.home" :away="guess.away"
                            :style="'background-color: var(--v-pcup-lighten2); line-height:0.2rem;'"
                        />
                        <v-row align="center" class="lh-1"
                            :style="'background-color: var(--v-pcup-lighten4)'"
                        >
                            <v-col>
                                <v-container>
                                    <v-row>LOCKED {{guess.home}} - {{guess.away}}</v-row>
                                    <v-row class="py-1">MATCH
                                        <template v-if="match.verified_at">{{match.score_home}} - {{match.score_away}}</template>
                                        <template v-else>?</template>
                                    </v-row>
                                </v-container>
                            </v-col>
                        </v-row>
                    </template>
                    <template v-else>MISSED</template>
                </div>
            </v-col>
        </v-row>

                
        <template v-if="!guess.guessed_at && !guess.verified_at && match.score_home === null">
            <guess-single-picker
                :guess="guess"
                :style="'background-color: ' + ppRGBA($store.state.navigation.rgb, .2)"
            />
            <guess-single-bottom-action
                :style="'background-color: ' + ppRGBA($store.state.navigation.rgb)"
                :guess="guess"
                :onclick="lockGuess"
            />
        </template>
    </p-p-card>
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