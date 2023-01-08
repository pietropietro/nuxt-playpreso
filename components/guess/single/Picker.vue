<template>
    <!-- <v-row> -->
        <!-- <v-col cols="12">
            <match-inner-values :guess="guess"  />
        </v-col> -->
        <!-- <v-col cols="12"> -->
            <v-row no-gutters justify="center" align="center" class="ocrastd">
                    <select-integer
                        justify="end"
                        :disabled="pickerDisabled"
                        :model="guess.home"
                        :setModel="(val)=>{guess.home = val}"
                    />
                <v-col cols="auto">
                    <h1 class="text-center" style="user-select: none;">-</h1>
                </v-col>
                    <select-integer
                        justify="start"
                        :disabled="pickerDisabled"
                        :model="guess.away"
                        :setModel="(val)=>{guess.away = val}"
                    />
            </v-row>
        <!-- </v-col>
    </v-row> -->
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