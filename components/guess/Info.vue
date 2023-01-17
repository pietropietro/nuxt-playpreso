<template>
    <v-row class="h-100" align="end">
        <v-col>
            <v-row justify="center">
                <h1 v-if="!small">{{value1}}</h1>
                <h3 v-else-if="isMissed(guess)"><p-p-emoji model="red-x"/></h3>
                <h3 v-else-if="guess.guessed_at && !guess.verified_at"><p-p-emoji model="lock"/></h3>
                <h3 v-else>{{value1}}</h3>
                <template v-if="!!value2">
                    <h4 v-if="!small"
                        :class="value2.class ?? ''"
                        :style="value2.color ? 'color:' + value2.color : ''"
                    >
                        {{value2?.text ?? value2}}
                    </h4>
                    <h6 v-else>{{value2}}</h6>
                </template>
            </v-row>
            <v-row
                v-if="!hideUsername"
                :style="'--currentuser-color-var:' + color"
                justify="center"
                :class="'text-overline mt-0 ' + label?.class ?? ''" >
                {{label?.text}}
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        color: {tyep: String},
        presoColor: {tyep: String},
        guess: {type: Object, required: true},
        incrementalFont: {type: Boolean},
        hideUsername: {type: Boolean}
    },
    computed:{
        small(){
            return this.guess.points < 9 && this.incrementalFont;
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
            if(!this.guess.guessed_at) return '?';
            if(this.guess.guessed_at && this.guess.home !== null) return this.guess.home + '-' + this.guess.away;
        },
        value2(){
            if(this.guess.PRESO) return {text: 'PRESO!', class: "ocrastd", 
                color: this.presoColor
            };
            if(this.guess.verified_at && this.guess.guessed_at) return this.guess.home + '-' + this.guess.away;
            return null;
        }
    }
}
</script>