<template>
    <v-row align="end" :class="$vuetify.breakpoint.mdAndUp ? 'flex-nowrap' : ''">
        <v-col cols="auto">
            <em-emoji v-if="ppTournamentType.emoji" :native="ppTournamentType.emoji" size="2.5em"/>
        </v-col>
        <v-col cols="auto">
            <div class="overline lh-1">P-LEAGUE</div>
            <div class="text-h2 font-weight-bold">{{ppTournamentTypeTitle(ppTournamentType)}}</div>
        </v-col>
        <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
        <v-col sm="auto" cols="6">
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
        <v-col cols="6" sm="auto" class="mx-sm-4">
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
        <v-col cols="6" sm="auto">
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