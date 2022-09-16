<template>
    <v-card flat class="transparent">
        <div>
            <match-info-big :match="match"/>
            <guess-single-picker
                class="py-10"
                :guess="guess"
            />
            <guess-single-bottom-action
                :guess="guess"
                :onclick="lockGuess"
            />
        </div>
    </v-card>
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