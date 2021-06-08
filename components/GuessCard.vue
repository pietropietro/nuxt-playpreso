<template>
    <v-card class="pa-4 my-2" style="min-width:90px;" :class="guess.preso_score === 19 ? 'white--text' : ''" :color="guess.preso_score === 19 ? 'accent' : ''">
        <v-row justify="center">
            <h3>{{usernameForId(guess.user_id)}}</h3>
        </v-row>
        <v-row justify="center">
            <h4>{{guess.guess_home + '-' + guess.guess_away}}</h4>
        </v-row>
        <v-row justify="center">
            <h2>{{guess.preso_score !== '0' ? '+' : ''}} {{guess.preso_score}}</h2>
        </v-row>
    </v-card>
</template>
<script>
export default {
    name: "GuessCard",
    props:{
        guess: {type: Object, required: true},
        //TODO remove
        users: {type: Array, required: true},
    },
    methods:{
        //porcata, username deve essere ritornato in oggetto guess
        usernameForId(userId){
            let returnVal
            this.users.map(u => {
                if(u.user.user_id === userId){
                    returnVal = u.user.username;
                }
                return;
            });
            return returnVal;
        }
    }
}
</script>