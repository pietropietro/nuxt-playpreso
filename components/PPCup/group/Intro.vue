<template>
    <v-container>
        <v-row >
            <v-spacer/>
            <em-emoji v-if="ppCupGroup.ppTournamentType.emoji" :native="ppCupGroup.ppTournamentType.emoji" size="5em"/>
            <v-spacer/>
        </v-row>
        <v-row justify="center">
            <div class="overline lh-1">{{cupGroupStageString(ppCupGroup, ppCupGroup.ppTournamentType.cup_format)}}</div>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        ppCupGroup: {type: Object}
    }
}
</script>