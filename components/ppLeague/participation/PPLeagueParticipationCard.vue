<template>
    <div>
        <v-row class="white--text pa-1" :style="'background-color: ' + rgbaFromPPLT(participation.ppLeagueType)" v-if="participation">
            <h2>{{participation.ppLeagueType.type}} {{participation.ppLeagueType.level}}</h2>
        </v-row>
        <v-row :style="'background-color: ' + rgbaFromPPLT(participation.ppLeagueType,'.5')" justify="center" v-if="!participation.ppLeague.started_at">
            <h2>NOT STARTED</h2>
        </v-row>
        <template v-else>
            <v-row class="px-2" :style="'background-color: ' + rgbaFromPPLT(participation.ppLeagueType,'.5')">
                <v-col cols="4">

                    <!-- TODO create component -->
                    <v-row justify="center">
                        <h1>{{participation.position}}</h1>
                        <h4>{{participation.ppLeague.users_count}}</h4>
                    </v-row>
                    <v-row justify="center" class="text-overline mt-0">position</v-row>

                </v-col>
                <v-col cols="4">

                    <!-- TODO create component -->
                    <v-row justify="center">
                        <h1>?</h1>
                        <h4>{{participation.ppLeagueType.rounds}}</h4>
                    </v-row>
                    <v-row justify="center" class="text-overline mt-0">rounds</v-row>
                    
                </v-col>
            </v-row>
        </template>
    </div>
</template>
<script>
export default {
    name:"PPLeagueParticipationCard",
    props:{
        participation: {type: Object, required: true}
    },
}
</script>