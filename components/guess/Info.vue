<template>
    <v-container :style="small ? 'width:80px; height:80px;' : 'width:110px; height:80px;'">
        <v-row justify="center" style="height:100%" align="end">
            <p-p-info
                :small="small"
                :value="value1"
                :value2="value2"
                :label="label"
            />
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        guess: {type: Object, required: true},
    },
    computed:{
        small(){
            return this.guess.score < 9;
        },
        label(){
            return {
                class: this.guess.user_id === this.currentUser.id ? 'currentuser' : null, 
                text: this.guess.username
            };
        },
        value1(){
            if(this.guess.verified_at && this.guess.guessed_at) return this.guess.score === 0 ? 0 : '+' + this.guess.score;
            if(this.isMissed(this.guess)) return 'MISSED';
            if(!this.guess.guessed_at) return '?';
            return 'LOCKED'
        },
        value2(){
            if(this.guess.PRESO) return {text: 'PRESO', class: "ocrastd", color: this.$store.state.navigation.color};
            if(this.guess.verified_at && this.guess.guessed_at) return this.guess.guess_home + '-' + this.guess.guess_away;
            return null;
        }
    }
}
</script>