<template>
    <p-p-card color="var(--v-pcup-base)" v-if="guess">
        <v-row>
            <v-col
                :style="{ backgroundColor: guess.verified_at ?  shades.verified : (guess.guessed_at ? shades.locked : shades.unlocked) }"
            >
                <match-info-short :match="match"/>
            </v-col>

            <v-col class="pa-0" v-if="!(!guess.guessed_at && guess.verified_at)">
                <!-- <v-container fill-height> -->
                    <match-inner-values
                        v-if="guess.verified_at"
                        :guess="guess"
                        :style="{ backgroundColor: guess.verified_at ?  shades.verified : (guess.guessed_at ? shades.locked : shades.unlocked) }"
                    />

                    <v-row no-gutters
                        class="h-100"
                        justify="center" align="center"
                        v-if="guess.guessed_at"
                        :style="{ backgroundColor: guess.verified_at ?  shades.verified : shades.locked}"
                    >
                        
                        <v-container class="px-6" style="line-height:1.5rem;">
                                <v-row justify="center">
                                    <h2 >
                                        <p-p-emoji model="lock" />
                                    </h2>
                                </v-row>
                                <v-row justify="center">
                                    <h2 class="ocrastd"> {{guess.home}}-{{guess.away}}</h2>
                                </v-row>
                        </v-container>
                                    
                    </v-row>
                    <v-row v-else no-gutters class="h-100">
                        <v-container>
                            <!-- <v-row> -->
                                <guess-single-picker :guess="guess"
                                class="px-2"
                                    :style="{ backgroundColor: shades.unlocked}"
                                />
                            <!-- </v-row> -->
                            <guess-single-bottom-action
                                :style="{ backgroundColor: shades.verified}"
                                :guess="guess"
                                :onclick="lockGuess"
                            />
                        </v-container>
                    </v-row>
                <!-- </v-container> -->
            </v-col>
            <v-col v-else>MISSED</v-col>
        </v-row>
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
            lockButtonLoading: false,
            shades:{locked: 'var(--v-pcup-lighten3)', verified: 'var(--v-pcup-base)', unlocked: 'var(--v-pcup-lighten5)' }
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