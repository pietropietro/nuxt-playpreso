<template>
    <v-row class="text-center pr-2">
        <v-col cols="4">
            {{home + away > 2 ? 'ovr' : 'und'}}
        </v-col>
        <v-col cols="4">
            {{home === away ? 'X' : home > away ? '1' : '2'}}
        </v-col>
        <v-col cols="4">
            {{home > 0 && away > 0 ? 'gol' : 'ngl'}}
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        home: {type: Number},
        away: {type: Number}
    }
}
</script>