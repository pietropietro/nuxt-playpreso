<template>
    <div class="position relative">
        <v-row no-gutters class="h-100"
            v-if="guess.verified_at"
            justify="center" align="center"
        >
            <template v-if="toggleState">
                <div class="overline lh-1">
                    win<br>{{guess.winner_prize}}
                </div>
            </template>
            <template v-else>
                <em-emoji v-if="isMissed(guess) && (!guess.id || ['motd','flash'].includes(guess.id))" id="dash" size="2em"/>
                <em-emoji v-else-if="isMissed(guess)" id="x" size="2em"/>
                <template v-else>
                    <p-p-preso v-if="guess.PRESO"/>
                    <h2 v-else>
                        {{guess.points}}
                    </h2>
                </template>
            </template>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        guess: {type:Object}
    },
    data() {
        return {
            toggleState: false,    // toggles true/false every second
            intervalId: null,
        };
    },
    mounted() {
        // If match is live, start toggling
        if (this.guess.winner === 1 && this.guess.ppTournamentType.name=='Flash') {
            this.intervalId = setInterval(() => {
                this.toggleState = !this.toggleState;
            }, 2000);
        }
    },
    beforeDestroy() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    },
}
</script>
