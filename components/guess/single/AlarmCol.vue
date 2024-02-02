<template>
    <v-col
        v-if="isWithinNext24Hours && !guess.verified_at && !guess.guessed_at"
        cols="auto"
        :style="{
            backgroundColor: ppRGBA(rgb),
            width: big ? '40px' : '20px',
            height: height,
            overflow: 'hidden'
        }"
        class="rounded-tl rounded-bl pa-1"
    >
        <em-emoji
            style="display:flex"
            :class="'mt-n3 ' + (big ? 'ml-n10': 'ml-n6 ') "
            native="alarm_clock"
            size="70"
        />
    </v-col>
</template>

<script>
export default {
    props:{
        guess: {tyep: Object},
        match: {tyep: Object},
        rgb: {type: String},
        big: {type: Boolean},
        height: {type: String}
    },
    computed:{
        isWithinNext24Hours() {
            if(!this.guess || !this.match)return false;
            // Get the current timestamp
            let currentTime = new Date().getTime();

            // Calculate the timestamp for the current time plus 24 hours
            let next24Hours = currentTime + (24 * 60 * 60 * 1000);

            // Parse the given match's start date
            let matchDate = new Date(this.match?.date_start).getTime();

            // Compare the match's start date with the current time plus 24 hours
            return matchDate <= next24Hours;
        }
    },
}
</script>

<style>

</style>