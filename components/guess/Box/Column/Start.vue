<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center"
            justify="center"
            class="text-center"
            :style="{
                height: size +'px',
                width: size +'px',
                background: shades[i-1]
            }"
        >
            <v-col class="pa-0">
                <team-logo v-if="i==1"
                    :id="match.homeTeam.id"
                    :name="match.homeTeam.name"
                    size="30"
                    :country="match.league.country != match.homeTeam.country ? match.homeTeam.country : ''"
                />
                <template v-if="i==2" >
                    <template v-if="flashWinToggle">
                        <div class="overline lh-1 gold--text">
                            win<br>{{guess.winner_prize}}
                        </div>
                    </template>
                    <div style="font-size:2em;" v-else>
                        {{ guess.ppTournamentType.emoji }}
                    </div>
                </template>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        match: {type: Object},
        guess: {type: Object},
        shades: {type: Array},
        size: {type: Number, default: 49},
    },
    data() {
        return {
            flashWinToggle: false,    // toggles true/false every second
            intervalId: null,
        };
    },
    mounted() {
        // If match is live, start toggling
        if (this.guess.winner === 1 && this.guess.ppTournamentType.name=='Flash') {
            this.intervalId = setInterval(() => {
                this.flashWinToggle = !this.flashWinToggle;
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
