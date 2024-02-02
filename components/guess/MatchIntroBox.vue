<template>
    <v-container v-if="guess && match">   
        <v-row
            class="rounded-lg"
            @click="onClick ? onClick(guess) : null"
            :style="{
                height: cardHeight,
                overflow: 'hidden',
            }"
        >   
            <!--  ALARM IF LESS THAN 1 day not motd -->
            <guess-single-alarm-col
                :big="big"
                :guess="guess" 
                :match="match"
                :rgb="rgb"
                :height="cardHeight"
            />
            <!-- END ALARM -->
            <v-col>
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
            cardHeight: '90px',
            shades:{
                unlocked:  this.ppRGBA(this.rgb, 0.6) 
            },
        }
    },
}
</script>