<template>
    <div  style="height:100%">
        <v-container v-if="selectedPage === 1" class="mb-7">
            <!-- <v-row justify="center">
                <h1>{{PCGroup.groupTag}}</h1>
            </v-row> -->
            <!-- <cup-users-standings class="my-5" :users="PCGroup.users" :size="PCGroup.size" :level="PCGroup.level"/> -->
            <!-- <get-round
                v-if="canGetRound" :round="PCGroup.matchBlocks ? PCGroup.matchBlocks.length + 1 : 1"
                :groupId="PCGroup.id" class="my-7" :refresh="refresh"
            /> -->
            <match-blocks-slider class="pt-5" v-if="tournamentObj.ppRounds"
                :ppRounds="tournamentObj.ppRounds" :rounds="tournamentObj.rounds" :ups="tournamentObj.userParticipations"
            />
        </v-container>
        <!-- <lock-guess v-else :guess="selectedGuess" :match="selectedMBI.match" :refresh="refresh" class="mb-7"/> -->
        <v-pagination
            v-if="userInGroup"
            v-model="selectedPage"
            :length="!tournamentObj.ppRounds ? 1 : 1 + tournamentObj.ppRounds[tournamentObj['round_count']-1].length"
            circle
            class="pagination-fixed no-arrows"
        />
    </div>
</template>
<script>
export default {
    name: "PPTournamentPagination",
    props: {
        tournamentObj: {type: Object, required: true}
    },
    data(){
        return {
            selectedPage: 1,
        }
    }
}
</script>