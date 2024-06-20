<template>
    <v-container>
        <v-row >
            <v-spacer/>
            <nuxt-link class="no-decoration" :to="ROUTES.PPCUP.DETAIL + ppCupGroup.ppCup_id">
                <em-emoji v-if="ppCupGroup.ppTournamentType.emoji" :native="ppCupGroup.ppTournamentType.emoji" size="5em"/>
            </nuxt-link>
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