<template>
    <v-card flat class="transparent">
        <p-p-tournament-title :ppTournamentType="participation.ppTournamentType" />
        <p-p-league-participation-row-not-started v-if="!participation.ppLeague.started_at" :participation="participation" style="min-height:68px;" />
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
