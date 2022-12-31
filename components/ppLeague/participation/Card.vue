<template>
    <v-container fluid class="black-border">
        <v-row class="pa-2">
            <h2>{{ppTournamentTypeTitle(participation.ppTournamentType)}}</h2>
        </v-row>        
        <template>
            <v-row v-if="!participation.ppLeague.started_at"  class="px-2">
                <div class="text-overline">NOT STARTED</div>
            </v-row>
            <v-row v-else-if="participation.ppLeague.finished" class="px-2">
                <div class="text-overline">FINISHED</div>
            </v-row>
            <p-p-league-participation-row-started v-else class="" 
                :participation="participation"
            />
        </template>
        <v-row class="black-border-t">
            c9a
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
}
</script>
