<template>
    <p-p-cup-intro :ppCup="ppCupGroup">
        <template slot="cup-group">
            <v-col cols="12" md="4">
                <p-p-info 
                    label="stage"
                    :value="cupGroupStageString(ppCupGroup, ppCupGroup.ppTournamentType.cup_format)"
                />
            </v-col>
        </template>
    </p-p-cup-intro>
</template>
<script>
export default {
    props:{
        ppCupGroup: {type: Object}
    }
}
</script>