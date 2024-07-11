<template>
    <v-container v-if="guess && match">   
        <v-row
            class="rounded-lg"
            @click="handleClick"
            :style="{
                height: boxheight,
                width: boxwidth,
                overflow: 'hidden'
            }"
        >   
            <template v-if="guess.guessed_at || guess.verified_at">
                <v-col style="max-width:49px;">
                    <guess-box-column-start
                        :guess="guess"
                        :match="match"
                        :shades="shades"
                        style="width: 49px"
                        :size="parseFloat(size)/2"
                    />
                </v-col>
                <v-col v-if="open">
                    <guess-box-column-middle 
                        :guess="guess"
                        :match="match"
                        :shades="shades"
                        :size="parseFloat(size)/2"
                        :maxWidth="parseFloat(boxwidth) - parseFloat(size)"
                    />
                </v-col>
                <v-col style="max-width:49px;">
                    <guess-box-column-end
                        style="width: 49px"
                        :guess="guess"
                        :match="match"
                        :shades="shades"
                        :size="parseFloat(size)/2"
                    />
                </v-col>
            </template>

            <v-col v-else>
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
    },
    computed:{
        shades(){
            if(this.guess.verified_at){
                return [this.ppRGBA(this.rgb, 0.6), this.ppRGBA(this.rgb,0.4)]
            }
            return [this.ppRGBA(this.rgb, 1), this.ppRGBA(this.rgb,0.6)]
        },
        boxwidth(){
            if(this.open) return '320px';
            return this.size;
        },
        boxheight(){
            return this.size;
        }
    },
    methods:{
        handleClick(){
            if(!this.guess.guessed_at && !this.guess.verified_at && !!this.onUnlockedClick){
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