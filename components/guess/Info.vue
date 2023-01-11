<template>
    <v-container :style="small && incrementalFont ? 'width:80px; height:80px;' : 'width:110px; height:80px;'">
        <v-row justify="center" style="height:100%" align="end">
            <p-p-info
                :small="small && incrementalFont"
                :value="value1"
                :value2="value2"
                :label="label"
                :style="'--currentuser-color-var: var(--v-'+ color + '-base)'"
            />
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        color: {tyep: String},
        guess: {type: Object, required: true},
        incrementalFont: {type: Boolean},
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
            if(this.guess.guessed_at && this.guess.home !== null) return this.guess.home + '-' + this.guess.away;
            return 'LOCKED'
        },
        value2(){
            if(this.guess.PRESO) return {text: 'PRESO', class: "ocrastd", 
                color: 'var(--v-accent-base)'
            };
            if(this.guess.verified_at && this.guess.guessed_at) return this.guess.home + '-' + this.guess.away;
            return null;
        }
    }
}
</script>