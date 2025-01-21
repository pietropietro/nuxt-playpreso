<template>
    <div>
        <v-row no-gutters justify="center" align="center" class="mx-2">
            <v-col>
                <guess-box-view
                    :match="next.match"
                    :guess="next.guess"
                    :rgb="next.guess.ppTournamentType.rgb"
                    :onUnlockedClick="onSelect"
                    :open="openId && openId == next.guess.id"
                    :setOpen="(val)=>openId=val"
                />
            </v-col>
            <v-col v-if=!openId>
                <v-row>
                    <v-col>
                        <p-p-info label="cost" :value="next.lock_cost" small/>
                    </v-col>
                    <v-col>
                        <p-p-info label="prize" :value="next.lock_cost * next.guesses.length" small/>
                    </v-col>
                </v-row>
                <v-row justify="center">
                        <!-- countdown -->
                        <h3 class="ocrastd">{{ formatTime(timeLeft) }}</h3>
                </v-row>
            </v-col>
        </v-row>
        <v-row class="pt-2" justify="center" no-gutters>
            <v-slide-group
                    class="px-2"
                    :show-arrows="!$vuetify.breakpoint.xs"
                    prev-icon="<"
                    next-icon=">"
                    :style="{ height: '80px'}"
                >
            <v-slide-item v-for="(guess,index) in next.guesses" :key="index">
                <div class="h-100 mx-4">
                    <guess-info
                        :color="ppRGBA(next.guess.ppTournamentType.rgb)"
                        :guess="guess"
                        :flipped="flipped"
                        :flip="()=>flipped=!flipped"
                    />
                </div>
            </v-slide-item>
        </v-slide-group>
        </v-row>
    </div>
</template>
<script>
export default{
    props:{
        next: {type: Object, required:true}
    },
    data(){
        return{
            openId: null,
            intervalId: null,      // holds setInterval reference
            timeLeft: 0,           // in seconds, for example
            flipped: false
        }
    },
    methods:{
        onSelect(){
            if(this.next.guess.guessed_at || this.next.match.verified_at) return;
            this.next.guess.match = this.next.match;
            this.$store.dispatch('openGuesses/update', {
                newGuess: this.next.guess,
                newList: [this.next.guess], 
            });
        },

        startCountdown() {
        // 1) Parse the match date/time (assuming next.match.date_start is e.g. "2025-01-20 20:30:00")
        //    Adjust or consider timezones if needed
        const matchTime = new Date(this.next.match.date_start.replace(' ', 'T')); 
        // if you must ensure UTC or specific offset, do so here

        // 2) Immediately compute initial timeLeft
        this.updateTimeLeft(matchTime);

        // 3) Setup interval every 1s
        this.intervalId = setInterval(() => {
            this.updateTimeLeft(matchTime);
        }, 1000);
        },

        stopCountdown() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },

        updateTimeLeft(matchTime) {
        const now = new Date();
        const diffMs = matchTime - now;
        if (diffMs <= 0) {
            // time is up => set to 0
            this.timeLeft = 0;
            // call optional callback
            this.onCountdownFinished();
            // optionally stop the interval if you don't need to keep counting
            this.stopCountdown();
        } else {
            // Convert ms -> seconds (you can remain in ms if you prefer)
            this.timeLeft = Math.floor(diffMs / 1000);
        }
        },

        onCountdownFinished() {
        // Called when countdown hits zero
        // e.g., you can trigger a refresh, or let the user know "Match started!"
        console.log('Countdown finished. Match should be starting now.');
        },

        /**
         * Utility: format timeLeft (in seconds) as HH:MM:SS
         */
        formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        // zero-pad if needed
        const hh = h < 10 ? '0' + h : '' + h;
        const mm = m < 10 ? '0' + m : '' + m;
        const ss = s < 10 ? '0' + s : '' + s;

        if (h > 0) {
            return `${hh}:${mm}:${ss}`;
        } else {
            // If you want to hide hours if zero
            return `${mm}:${ss}`;
        }
        },
    },
    mounted() {
        this.startCountdown();
    },
    beforeDestroy() {
        this.stopCountdown();
    },
}
</script>