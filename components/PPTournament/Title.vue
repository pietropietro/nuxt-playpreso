<template>
    <v-row class="white--text pa-2" :style="'background-color: ' + ppRGBA(participation.ppTournamentType.rgb)">
        <h2>{{ppTournamentTypeTitle(participation.ppTournamentType)}}</h2>
        <v-col>
            <p-p-league-participation-row-finished v-if="participation.ppLeague.finished_at" :participation="participation" style="min-height:40px;" />
            <p-p-league-participation-row-not-started v-if="!participation.ppLeague.started_at" :participation="participation" style="min-height:68px;" />
            <p-p-league-participation-row-started v-else :participation="participation" class="white--text" style="height:40px;"/>            
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    }
}
</script>
