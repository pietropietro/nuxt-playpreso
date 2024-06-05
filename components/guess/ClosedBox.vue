<template>
    <v-container v-if="guess && match">   
        <v-row
            class="rounded-lg"
            @click="onClick(guess, match)"
            :style="{
                height: size,
                minWidth: size,
                overflow: 'hidden'
            }"
        >   
            <!--  ALARM IF LESS THAN 1 day not motd -->
            <v-col  v-if="isWithinNext24Hours(match?.date_start) && !guess.guessed_at">
                <guess-closed-alarm
                    :rgb="rgb"
                    :height="size"
                />
            </v-col>

            <v-col v-else>
                <guess-closed-teams 
                    :rgb="rgb" 
                    :match="match" 
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
        size: {type: String, default: '98px'}
    },
    data(){
        return{
            shades:{
                unlocked:  this.ppRGBA(this.rgb, 0.6) 
            },
        }
    },
}
</script>