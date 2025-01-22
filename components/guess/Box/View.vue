<template>
    <v-container v-if="guess && match"
            :style="{
                height: boxheight,
                width: boxwidth,
                overflow: 'hidden'
            }"
            :class="{ brilliance: isShiny }"
    >   
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
                        && !['MOTD', 'Flash'].includes(guess.ppTournamentType?.name)"
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
        isShiny(){
            if(this.guess.PRESO)return true;
            if(this.guess.winner)return true;
            return false;
        },
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
        async handleClick(){
            await this.triggerHapticFeedback();
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

<style>
.brilliance {
  position: relative;
  overflow: hidden;
}

.brilliance::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  /* Fill entire container so we can slide the diagonal band across it */
  width: 100%;
  height: 100%;
  
  /* Wider diagonal band:
     - Transparent until ~40%
     - White from 40% to 60%
     - Transparent again after 60% */
  background: linear-gradient(
    120deg,
    transparent 40%,
    rgba(255, 255, 255, 0.8) 50%,
    transparent 60%
  );
  
  /* Start well off to the left */
  transform: translateX(-120%) skewX(-20deg);
  
  /* 3.5s total:
     - 1.5s to cross
     - 2s pause off the right side */
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes shimmer {
  /* Start: off the left edge */
  0% {
    transform: translateX(-120%) skewX(-20deg);
  }
  /* By ~43%, we've swept fully to the right */
  50% {
    transform: translateX(220%) skewX(-20deg);
  }
  /* Pause off the right edge until 100% (another 57% of 3.5s => ~2s) */
  100% {
    transform: translateX(220%) skewX(-20deg);
  }
}
</style>