<template>
    <v-row class="h-100" align="end" @click="flip">
        <v-col> 
            <v-row justify="center">
                <!-- LOCKED -->
                <em-emoji v-if="guess.guessed_at && !guess.verified_at" id="lock"/>
                <!-- MISSED -->
                <em-emoji v-else-if="isMissed(guess)" id="x"/>
                <!-- UNLOCKED -->
                <h3 v-else-if="!guess.guessed_at && !guess.verified_at">?</h3>
                <!-- PRESO -->
                <h3 v-else-if="guess.PRESO" class="ocrastd" :style="{color: presoColor}">PRESO!</h3>
                
                <!-- OTHER POINTS -->
                <div v-else class="flex-nowrap">
                    <v-row no-gutters v-if="!flipped">
                        <h3>
                            {{guess.points}}
                        </h3>
                    </v-row>
                    <v-row no-gutters v-else>
                        <h3>{{guess.home}} </h3>
                        <h5 v-if="guess.home===3">+</h5>
                        <h3>-</h3>
                        <h3>{{guess.away}}</h3>
                        <h5 v-if="guess.away===3">+</h5>
                    </v-row>
                </div>
            </v-row>
            
            <v-row
                v-if="!hideUsername"
                :style="'--currentuser-color-var:' + color"
                justify="center"
                :class="'text-overline mt-0 ' + usernameObj?.class ?? ''"
            >
                {{usernameObj?.text}}
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
        hideUsername: {type: Boolean},
        flipped: {type: Boolean},
        flip: {type: Function}
    },
    computed:{
        usernameObj(){
            if(this.hideUsername)return null;
            return {
                class: this.guess.user_id === this.currentUser.id ? 'font-weight-bold currentuser' : null, 
                text: this.guess.username
            };
        },
    },
}
</script>