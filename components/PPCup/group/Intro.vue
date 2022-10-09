<template>
    <p-p-cup-intro :ppTournamentType="ppTournamentType">
        <template slot="cup-group">
            <v-col cols="12" md="4">
                <p-p-info 
                    label="stage"
                    :value="cupGroupStageString(ppCupGroup, ppTournamentType.cup_format)"
                />
            </v-col>
        </template>
    </p-p-cup-intro>
</template>
<script>
export default {
    props:{
        ppTournamentType: {type: Object},
        ppCupGroup: {type: Object}
    }
}
</script>