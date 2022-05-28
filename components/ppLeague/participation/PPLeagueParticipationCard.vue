<template>
    <div>
        <v-row class="white--text pa-1" :style="'background-color: ' + ppRGBA(participation.ppLeagueType)" v-if="participation">
            <h2>{{participation.ppLeagueType.type}} {{participation.ppLeagueType.level}}</h2>
        </v-row>
        <v-row :style="'background-color: ' + ppRGBA(participation.ppLeagueType,'.5')" class="black--text" justify="center" v-if="!participation.ppLeague.started_at">
            <h2>NOT STARTED</h2>
        </v-row>
        <template v-else>
            <v-row class="px-2 black--text" align="center" :style="'background-color: ' + ppRGBA(participation.ppLeagueType,'.5')">
                <v-col cols="4">

                    <!-- TODO create component -->
                    <v-row justify="center">
                        <h1>{{participation.position}}</h1>
                        <h4>{{participation.ppLeague.users_count}}</h4>
                    </v-row>
                    <v-row justify="center" class="text-overline mt-0">position</v-row>

                </v-col>
                <v-col cols="4">

                    <!-- TODO reuse component -->
                    <v-row justify="center">
                        <h1>{{participation.ppLeague.round_count}}</h1>
                        <h4>{{participation.ppLeagueType.rounds}}</h4>
                    </v-row>
                    <v-row justify="center" class="text-overline mt-0">round</v-row>
                    
                </v-col>
                <v-col cols="4">
                     <v-row justify="center">
                        <h3>{{participation.locked ? 'LOCKED' : 'UNLOCKED'}}</h3>
                    </v-row>
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