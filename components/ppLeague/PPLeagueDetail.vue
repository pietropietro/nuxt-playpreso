<template>
    <v-container>
        <!-- <v-row justify="center">
            <h1>{{PCGroup.groupTag}}</h1>
        </v-row> -->
        <league-scroll :leagues="tournamentObj.ppLeagueType.leagues" class="py-5"/>
        <user-participation-standings :ups="tournamentObj.userParticipations" class="py-5"/>
        <!-- <cup-users-standings class="my-5" :users="PCGroup.users" :size="PCGroup.size" :level="PCGroup.level"/> -->
        <!-- <get-round
            v-if="canGetRound" :round="PCGroup.matchBlocks ? PCGroup.matchBlocks.length + 1 : 1"
            :groupId="PCGroup.id" class="my-7" :refresh="refresh"
        /> -->
        <p-p-round-slider v-if="tournamentObj.ppRounds.length > 0"
            :ppRounds="tournamentObj.ppRounds" :rounds="tournamentObj.ppLeagueType.rounds"
            class="py-5"
        />
    </v-container>
</template>
<script>
export default {
    name: "PPLeagueDetail",
    props:{
        tournamentObj: {type: Object, required: true},
    }
}
</script>