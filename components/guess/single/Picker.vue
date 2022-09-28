<template>
    <v-row no-gutters align="center">
        <v-col cols="3">
            <v-row no-gutters class="ocrastd text-right" style="font-size:12px;">
                <v-col cols="12">
                    <div>
                        {{guess.home + guess.away > 2 ? 'over' : 'under'}}
                    </div>
                </v-col>
                <v-col cols="12">
                    <div>
                        {{guess.home === guess.away ? 'X' : guess.home > guess.away ? '1' : '2'}}
                    </div>
                </v-col>
                <v-col cols="12">
                    <div>
                        {{guess.home > 0 && guess.away > 0 ? 'gol' : 'no-gol'}}
                    </div>
                </v-col>
            </v-row>
        </v-col>
        <v-col>
            <v-row no-gutters justify="center" align="center" class="ocrastd">
                <select-integer
                    :disabled="pickerDisabled"
                    :model="guess.home"
                    :setModel="(val)=>{guess.home = val}"
                />
                <v-col cols="2">
                    <h1 class="text-center" style="user-select: none;">-</h1>
                </v-col>
                <select-integer
                    :disabled="pickerDisabled"
                    :model="guess.away"
                    :setModel="(val)=>{guess.away = val}"
                />
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        guess: {type: Object},
    },
    computed: {
        pickerDisabled(){
            return !!this.guess.guessed_at || !!this.guess.verified_at;
        }
    },
}
</script>