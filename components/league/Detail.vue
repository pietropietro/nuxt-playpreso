<template>
    <v-row no-gutters v-if="!small">
        <v-col cols="12">
            <league-flag :league="league" />
        </v-col>
        <v-col cols="12">
            <div class="text-overline" style="text-align:center">{{league.tag}}</div>
        </v-col>
    </v-row>
    <v-row v-else class="pa-0 ma-0">
        <!-- <league-flag :league="league" small /> -->
        <div class="text-overline">{{league.tag}}</div>
    </v-row>
</template>
<script>
export default {
    props: {
        league: {type: Object, required: true},
        small: {type: Boolean, default: false}
    } 
}
</script>