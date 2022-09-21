<template>
    <v-row>
        <v-col cols="6" sm="3">
            <div class="text-overline">P-LEAGUE</div>
            <h1>{{ppTournamentTypeTitle(ppTournamentType)}}</h1>
        </v-col>
        <v-col cols="6" sm="3">
            <div class="text-overline">qualifies to</div>
            <h1>{{ppTournamentTypeTitle(ppTournamentType)}}</h1>
        </v-col>
        <v-col cols="6" sm="3">
            <div class="text-overline">participants</div>
            <h1>{{ppTournamentType.participants}}</h1>
        </v-col>
        <v-col cols="6" sm="3">
            <div class="text-overline">leagues</div>
            <h1>{{ppTournamentType.leagues.length}}</h1>
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