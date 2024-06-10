<template>
    <v-row >
        <v-col>
            <nuxt-link :to="ROUTES.PPCUP.DETAIL + ppCupGroup.ppCup_id" class="no-decoration">
                <p-p-info 
                    label="stage"
                    :value="cupGroupStageString(ppCupGroup, ppCupGroup.ppTournamentType.cup_format)"
                />
            </nuxt-link>
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