<template>
    <v-row v-if="showDetailedStats" justify="end" align="end" style="width:100%">
        <v-col cols="auto" class="ml-2">
            <v-avatar
                color="pcup"
                size="10"
            />
            <span class="overline" style="line-height:1rem">
                {{
                    cupGroupStageString(group, cupFormat) === 'FINAL' ? 
                    'WINNER' : 'QUALIFIES'
                }}
            </span>
        </v-col>
        <v-col class="pr-8 pr-sm-0 mb-1">
            <user-participation-standing-labels
                :totalCupLabel="totalCupLabel"
            />
        </v-col>
    </v-row>
    <v-row no-gutters v-else :class="'mx-2 font-weight-bold caption'">
        <v-col>{{cupGroupStageString(group, cupFormat)}}</v-col>
        <match-live-blink v-if="group.isLive"/>
    </v-row>
</template>
<script>
export default {
    props:{
        totalCupLabel: {type: Boolean},
        showDetailedStats: {type: Boolean},
        group: {type: Object},
        cupFormat: {type: Array},
    }
}
</script>