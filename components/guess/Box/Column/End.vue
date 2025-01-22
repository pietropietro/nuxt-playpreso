<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center"
            justify="center"
            class="text-center"
            :style="{
                height: size +'px',
                width: size +'px',
                background: shades[i%2]
            }"
        >
            <v-col class="pa-0">
                <team-logo 
                    v-if="i==1"
                    :id="match.awayTeam.id"
                    :name="match.awayTeam.name"
                    size="30"
                    :country="match.league.country != match.awayTeam.country ? match.awayTeam.country : ''"
                />
                <template v-else>
                    <h1 v-if="showDot" class="ocrastd red--text live-dot">∙</h1>
                    <template v-else>
                        <guess-match-result
                        v-if="!guess.verified_at"
                        :guess="guess"
                        :match="match"
                        />
                        <guess-single-view-points
                        v-else
                        :guess="guess"
                        />
                    </template>
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
            dotState: false,    // toggles true/false every second
            intervalId: null,
        };
    },
    computed: {
        // showDot is true if match is live AND dotState is true
        showDot() {
            return this.match.live === 1 && this.dotState;
        },
    },
    mounted() {
        // If match is live, start toggling
        if (this.match.live === 1) {
            this.intervalId = setInterval(() => {
                this.dotState = !this.dotState;
            }, 1000);
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

<style scoped>
.live-dot {
  display: inline-block;
  animation: moveLeftRight 0.5s infinite alternate ease-in-out;
}

@keyframes moveLeftRight {
  from {
    transform: translateX(-2px);
  }
  to {
    transform: translateX(2px);
  }
}
</style>