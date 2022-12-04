<template>
    <v-row class="overline">
        <v-col v-if="group.finished_at">FINISHED</v-col>
        <template v-else-if="group.started_at">
            <v-col>
                <div>
                    ROUND {{group.currentRound}}/{{group.rounds}} 
                    PLAYED {{group.verifiedInCurrentRound[0]}}/{{group.verifiedInCurrentRound[1]}}
                </div>
            </v-col>
        </template>
    </v-row>
</template>
<script>
export default {
    props:{
        group: {type: Object}
    }
}
</script>