<template>
    <v-card flat class="transparent">
        <v-row class="white--text pa-2" :style="'background-color: ' + ppRGBA(participation.ppLeagueType)" v-if="participation">
            <h2>{{ppLeagueTypeTitle(participation.ppLeagueType)}}</h2>
        </v-row>
        <v-row v-if="!participation.ppLeague.started_at" :style="'background-color: ' + ppRGBA(participation.ppLeagueType,'.6')" justify="center" align="center" >
            <v-col cols="4">
                <p-p-info :label="$t('app.users')" :value="participation.ppLeague.user_count"/>
            </v-col>
            <v-col><h3 class="ocrastd">NOT STARTED</h3></v-col>
        </v-row>
        <template v-else>
            <v-row class="px-2 black--text" align="center" :style="'background-color: ' + ppRGBA(participation.ppLeagueType,'.6')">
                <v-col cols="4">
                    <p-p-info :label="$t('app.position')" :value="participation.position" :value2="participation.ppLeague.user_count"/>
                </v-col>
                <v-col cols="4">
                    <p-p-info label="round" :value="participation.ppLeague.round_count" :value2="participation.ppLeagueType.rounds"/>
                </v-col>
                <v-col cols="4">
                     <v-row justify="center">
                        <h3 class="ocrastd">{{participation.locked ? 'LOCKED' : 'UNLOCKED'}}</h3>
                    </v-row>
                </v-col>
            </v-row>
        </template>
    </v-card>
</template>
<script>
export default {
    name:"PPLeagueParticipationCard",
    props:{
        participation: {type: Object, required: true}
    },
}
</script>
<style>
    .transparent{
        background-color: none !important;
    }
</style>