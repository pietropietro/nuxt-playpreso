<template>
    <v-row>
        <v-col cols="6" sm="3">
            <p-p-info 
                label="P-LEAGUE"
                :value="ppTournamentTypeTitle(ppTournamentType)"
            />
        </v-col>
        <v-col cols="6" sm="3">
           <p-p-info 
                label="qualifies to"
                :value="ppTournamentTypeTitle(ppTournamentType.next)"
            />
        </v-col>
        <v-col cols="6" sm="3">
            <p-p-info 
                label="participants"
                :value="ppTournamentType.participants"
            />
        </v-col>
        <v-col cols="6" sm="3">
            <p-p-info 
                :label="ppTournamentType.leagues.length > 1 ? 'leagues' : 'league'"
                :value="ppTournamentType.leagues.length"
            />
        </v-col>
        <!-- <v-col>
            <league-slider :leagues="ppTournamentType.leagues" class="py-5" />
        </v-col> -->
    </v-row>
</template>
<script>
export default {
    props:{
        ppTournamentType: {type: Object}
    }
}
</script>