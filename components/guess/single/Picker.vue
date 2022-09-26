<template>
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