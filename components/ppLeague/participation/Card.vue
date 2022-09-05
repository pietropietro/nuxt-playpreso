<template>
    <v-card flat class="transparent">
        <v-row class="white--text pa-2" :style="'background-color: ' + ppRGBA(participation.ppTournamentType)" v-if="participation">
            <h2>{{ppTournamentTypeTitle(participation.ppTournamentType)}}</h2>
        </v-row>
        <p-p-league-participation-row-not-started v-if="!participation.ppLeague.started_at" :participation="participation" />
        <p-p-league-participation-row-started v-else :participation="participation" />            
    </v-card>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
}
</script>
<style>
    .transparent{
        background-color: none !important;
    }
</style>