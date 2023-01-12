<template>
    <v-row align="end" :class="$vuetify.breakpoint.mdAndUp ? 'flex-nowrap' : ''">
        <v-col cols="auto">
            <div class="overline lh-1">P-LEAGUE</div>
            <div class="text-h2 font-weight-bold">{{ppTournamentTypeTitle(ppTournamentType)}}</div>
        </v-col>
        <v-col>
            <p-p-info 
                v-if="ppTournamentType.leagues.length == 1"
                label="league"
                :value="ppTournamentType.leagues[0].name"
            />
            <p-p-info 
                v-else
                label="leagues"
                :value="ppTournamentType.leagues.length"
            />
        </v-col>
        <v-col cols="6" sm="3">
           <p-p-info 
                v-if="ppTournamentType.next"
                label="qualifies to"
                :value="ppTournamentTypeTitle(ppTournamentType.next)"
            />
            <p-p-info v-else
                label="level"
                value="Last"
            />
        </v-col>
        <v-col cols="6" sm="3">
            <p-p-info 
                label="participants"
                :value="ppTournamentType.participants"
            />
        </v-col>
        
    </v-row>
</template>
<script>
export default {
    props:{
        ppTournamentType: {type: Object}
    }
}
</script>