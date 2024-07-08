<template>
    <v-container v-if="guess && match">   
        <v-row
            class="rounded-lg"
            @click="handleClick"
            :style="{
                height: size,
                minWidth: size,
                overflow: 'hidden'
            }"
        >   
            <template v-if="open">
                <guess-open-box :guess="guess" :match="match" :rgb="rgb"
                    :setOpen="setOpen"
                />
            </template>

            <template v-else-if="!open">
                <v-col v-if="guess.verified_at">
                    <guess-closed-verified
                        :rgb="rgb"
                        :match="match"
                        :size="parseFloat(size)/2"
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
                            :thirdCell="thirdCellLocked"
                        />
                    </v-col>
                </template>
                
                <v-col v-else-if="!guess.guessed_at">
                    <guess-closed-alarm
                        v-if="isWithinNext24Hours(match?.date_start)
                            && guess.ppTournamentType?.name != 'MOTD'"
                        :rgb="rgb"
                        :size="parseFloat(size)/2"
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
        open: {type: Boolean, default: false},
        setOpen: {type: Function},
        onUnlockedClick: {type: Function},
        size: {type: String, default: '98px'},
        withLogo: {type:Boolean, default: true},
        thirdCellLocked: {type: String, default: 'emoji'}
    },
    data(){
        return{
            shades:{
                unlocked:  this.ppRGBA(this.rgb, 0.6) 
            },
        }
    },
    methods:{
        handleClick(){
            if(!this.guess.guessed_at && !!this.onUnlockedClick){
                this.onUnlockedClick(this.guess, this.match);
                return;
            }
            if(this.open){
                this.setOpen(null);
                return;
            }
            this.setOpen(this.guess.id);
        }
    }
}
</script>