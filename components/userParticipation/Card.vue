<template>
    <v-container fluid :class="'border-b border-t ' + ($vuetify.breakpoint.mdAndUp ? 'border-r' : '')" >
        <v-row align="center">
            <v-col cols="auto overline" >
                <v-chip small flat :color="participation.ppLeague_id ? 'var(--v-pleague-base)' : 'var(--v-pcup-base)'">
                    {{participation.ppLeague_id ? 'P-LEAGUE' : 'P-CUP'}}
                </v-chip>
            </v-col>
            <v-col>
                <h2>{{ppTournamentTypeTitle(participation.ppTournamentType)}}</h2>
            </v-col>
        </v-row>        
        <template>
            <v-row v-if="!participation.started"  class="px-2">
                <div class="text-overline">NOT STARTED</div>
            </v-row>
            <v-row v-else-if="participation.finished" class="px-2">
                <div class="text-overline">FINISHED</div>
            </v-row>
            <user-participation-row-started v-else class="" 
                :participation="participation"
            />
        </template>
        
    </v-container>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
}
</script>
