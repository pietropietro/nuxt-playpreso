<template>
    <v-container v-if="guess && match">   
        <v-row
            class="rounded-lg"
            @click="onClick ? onClick(guess) : null"
            :style="{
                height: cardHeight,
                minWidth: cardHeight,
                overflow: 'hidden'
            }"
        >   
            <!--  ALARM IF LESS THAN 1 day not motd -->
            <v-col  v-if="isWithinNext24Hours && !guess.guessed_at">
                <guess-single-alarm-col
                    :rgb="rgb"
                    :height="cardHeight"
                />
            </v-col>

            <v-col v-else>
                <match-graphic-preview 
                    :rgb="rgb" 
                    :match="match" 
                    :big="big"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        guess: {type: Object, required: true},
        match: {type: Object, required: true},
        rgb: {type: String},
        onClick: {type: Function},
        big: {type: Boolean}
    },
    data(){
        return{
            cardHeight: '98px',
            shades:{
                unlocked:  this.ppRGBA(this.rgb, 0.6) 
            },
        }
    },
    computed:{
        isWithinNext24Hours() {
            if(!this.guess || !this.match)return false;
            // Get the current timestamp
            let currentTime = new Date().getTime();

            // Calculate the timestamp for the current time plus 24 hours
            let next24Hours = currentTime + (24 * 60 * 60 * 1000);

            // Parse the given match's start date
            let matchDate = new Date(this.match?.date_start).getTime();

            // Compare the match's start date with the current time plus 24 hours
            return matchDate <= next24Hours;
        }
    },
}
</script>