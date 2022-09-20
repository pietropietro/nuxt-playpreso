<template>
    <v-container :style="small ? 'width:80px; height:80px;' : 'width:110px; height:80px;'">
        <v-row justify="center" style="height:100%" align="end">
            <p-p-info
                :small="small"
                :value="value1"
                :value2="value2"
                :label="label"
                :style="'--my-color-var:' + ppRGBA($store.state.navigation.rgb)"
            />
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        guess: {type: Object, required: true},
        hideUsername: {type: Boolean}
    },
    computed:{
        small(){
            return this.guess.points < 9;
        },
        label(){
            if(this.hideUsername)return null;
            return {
                class: this.guess.user_id === this.currentUser.id ? 'font-weight-bold currentuser' : null, 
                text: this.guess.username
            };
        },
        value1(){
            if(this.guess.verified_at && this.guess.guessed_at) return this.guess.points === 0 ? 0 : '+' + this.guess.points;
            if(this.isMissed(this.guess)) return 'MISSED';
            if(!this.guess.guessed_at) return '?';
            return 'LOCKED'
        },
        value2(){
            if(this.guess.PRESO) return {text: 'PRESO', class: "ocrastd", color: this.ppRGBA(this.$store.state.navigation.rgb)};
            if(this.guess.verified_at && this.guess.guessed_at) return this.guess.home + '-' + this.guess.away;
            return null;
        }
    }
}
</script>