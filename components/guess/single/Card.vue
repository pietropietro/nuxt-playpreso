<template>
    <v-card flat class="transparent" v-if="guess" :class="match.score_home !== null ? 'white--text':''">
        <match-time-row :match="match" :style="'background-color: ' + ppRGBA($store.state.navigation.rgb)"/>
        <guess-single-teams
            :match="match" 
            :guess="guess" 
            :style="'background-color: ' + ppRGBA($store.state.navigation.rgb, statusAlpha)"
        />
        <template v-if="!guess.guessed_at && !guess.verified_at && match.score_home === null">
            <guess-single-picker
                class="py-5"
                :guess="guess"
                valueDescription
                :style="'background-color: ' + ppRGBA($store.state.navigation.rgb, .2)"
            />
            <guess-single-bottom-action
                :style="'background-color: ' + ppRGBA($store.state.navigation.rgb)"
                :guess="guess"
                :onclick="lockGuess"
            />
        </template>
    </v-card>
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
            }
            this.lockButtonLoading = false;
        }
    }
}
</script>