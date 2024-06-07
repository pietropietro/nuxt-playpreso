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
            <v-col v-if="guess.verified_at">
                <guess-closed-verified
                    :rgb="rgb"
                    :match="match"
                    :size="parseFloat(size)/2"
                    :guess="guess"
                />
            </v-col>
            
            <v-col v-else-if="!guess.guessed_at">
                    <guess-closed-alarm
                        v-if="isWithinNext24Hours(match?.date_start)"
                        :rgb="rgb"
                        :height="size"
                    />

                    <guess-closed-teams
                        v-else
                        :rgb="rgb"
                        :match="match"
                        :size="parseFloat(size)/2"
                        :withLogo="withLogo"
                        :withTag="!guess.guessed_at"
                        :guess="guess"
                    />
            </v-col>
            <template v-else-if="guess.guessed_at">
                <v-col>
                    <guess-closed-locked
                        :rgb="rgb"
                        :match="match"
                        :size="parseFloat(size)/2"
                        :withLogo="withLogo"
                        :guess="guess"
                    />
                </v-col>
            </template>
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
        size: {type: String, default: '98px'},
        withLogo: {type:Boolean, default: true}
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