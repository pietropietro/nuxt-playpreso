<template>
    <v-row>
        <v-col>
            <nuxt-link :to="ROUTES.PPCUP.DETAIL + ppCupGroup.ppCup_id" class="no-decoration">
                <p-p-info
                    label="p-cup"
                    :value="ppCupGroup.ppTournamentType?.name"
                />
            </nuxt-link>
        </v-col>
        <v-col>
            <p-p-info 
                label="stage"
                :value="cupGroupStageString(ppCupGroup, ppCupGroup.ppTournamentType.cup_format)"
            />
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        ppCupGroup: {type: Object}
    }
}
</script>