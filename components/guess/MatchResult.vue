<template>
    <v-row no-gutters align="center" justify="center" style="height:100%">
        <template v-if="togglePointsComposition">
            <guess-points-composition :guess="guess" :match="match"/>
        </template>
        <template v-else>
            <!-- GUESS -->
            <v-col cols="auto">
                <v-row no-gutters
                    v-if="guess.guessed_at"
                    justify="center"
                    align="center"
                    class="lh-1"
                >
                    <v-col
                        :cols="match.verified_at ? 'auto' : '12'"
                        :class="match.verified_at ? 'mr-1' : ''"
                    >
                        <em-emoji
                            id="lock"
                            :size="match.verified_at ? '0.6em' : '1em'"
                        />
                    </v-col>
                    <v-col class="pt-1">
                        <v-row no-gutters justify="center" align="center">
                            <select-integer
                                @click.native.stop
                                justify="end"
                                :disabled="true"
                                :model="guess.home"
                                :setModel="null"
                                small
                            />
                            <v-col cols="auto"
                                :style="guess.home==3 ? 'margin-left:-2px' : '' "
                            >
                                <h4 class="text-center" style="user-select: none;">-</h4>
                            </v-col>
                            <select-integer
                                @click.native.stop
                                justify="start"
                                :disabled="true"
                                :model="guess.away"
                                :setModel="null"
                                small
                            />
                        </v-row>
                    </v-col>
                </v-row>
                <!-- RESULT -->
                <v-row no-gutters justify="center" class="lh-1 text-center" align="center" v-if="match.verified_at">
                    <v-col
                        :cols="guess.guessed_at ? 'auto' : '12'"
                        :class="guess.guessed_at ? 'mr-1' : ''"
                    >
                        <em-emoji
                            id="checkered_flag"
                            :size="guess.guessed_at ? '0.6em' : '1em'"
                        />
                    </v-col>
                    <v-col
                        :class="guess.guessed_at ? '' : 'pt-1'"
                    >
                        <h4>{{ match.score_home  }}-{{ match.score_away }}</h4>
                    </v-col>
                </v-row>
            </v-col>
        </template>
    </v-row>

</template>
<script>
export default {
    props:{
        guess: {type: Object},
        match: {type: Object},
    },
    data() {
        return {
            togglePointsComposition: false,    
            intervalId: null,
        };
    },
    mounted() {
        // If match is live, start toggling
        if (this.isValidDatetime(this.guess.verified_at)) {
            this.intervalId = setInterval(() => {
                this.togglePointsComposition = !this.togglePointsComposition;
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