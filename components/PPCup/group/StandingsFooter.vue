<template>
    <v-row v-if="group.finished_at || group.started_at" :class="'overline' + (isDetailPage ? '' : ' mb-n5')">
        <v-col class="pb-0" v-if="group.finished_at">FINISHED</v-col>
        <template v-else-if="group.started_at">
            <v-col class="pb-0">
                <div>
                    R {{group.currentRound}}/{{group.rounds}} 
                    <template v-if="group.playedInCurrentRound">
                        P {{group.playedInCurrentRound[0]}}/{{group.playedInCurrentRound[1]}}
                    </template>
                </div>
            </v-col>
        </template>
    </v-row>
</template>
<script>
export default {
    props:{
        group: {type: Object},
        isDetailPage: {type: Boolean}
    }
}
</script>