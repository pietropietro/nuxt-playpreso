<template>
    <v-row justify="center" align="center" class="ocrastd">
            <select-integer
                @click.native.stop
                justify="end"
                :disabled="pickerDisabled"
                :model="guess.home"
                :setModel="(val)=>{guess.home = val}"
            />
        <v-col cols="auto" class="pa-1">
            <h1 class="text-center" style="user-select: none;">-</h1>
        </v-col>
            <select-integer
                @click.native.stop
                justify="start"
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