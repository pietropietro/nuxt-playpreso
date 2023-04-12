<template>
    <v-row no-gutters class="h-100"
        justify="center" align="center"
    >
        <v-container fill-height>
            <guess-single-picker :guess="guess"/>
            <guess-single-bottom-action
                    @click.native.stop
                    :style="{ backgroundColor: ppRGBA(rgb)}"
                    :color="ppRGBA(rgb)"
                    :guess="guess"
                    :onclick="lockGuess"
                    :loading="loading"
                    class="rounded-br"
                />
            </v-container >
    </v-row>
</template>
<script>
export default {
    props:{
        guess: {type: Object},
        rgb: {type: String},
        afterLock: {type: Function}
    },
    data(){
        return{
            loading: false,
        }
    },
    methods:{
        async lockGuess(){
            this.loading = true;
            let home = this.guess.home ?? 0;
            let away = this.guess.away ?? 0;
      
            let values = { 
                "home": home,
                "away": away
            }
            
            let route = this.guess.id ? this.API_ROUTES.GUESS.LOCK + this.guess.id : this.API_ROUTES.MOTD.LOCK;
            let response = await this.$api.call(
                route, values, 'POST'
            );

            if(response && response.status === "success"){
                this.guess.guessed_at = new Date();
                this.guess.home = home;
                this.guess.away = away;

                if(this.afterLock){
                    let copy = JSON.parse(JSON.stringify(this.guess));
                    copy.guessed_at = new Date();
                    copy.home = home;
                    copy.away = away;
                    this.afterLock(copy);
                }
            }
            this.loading = false;
        },
    }
}
</script>