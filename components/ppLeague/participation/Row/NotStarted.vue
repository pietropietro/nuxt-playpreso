<template>
    <v-row v-if="!participation.ppLeague.started_at" justify="center" align="center"
        :style="'background-color: ' + ppRGBA(participation.ppTournamentType.rgb,'.6')" 
    >
        <h3>NOT STARTED</h3>
    </v-row>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
}
</script>