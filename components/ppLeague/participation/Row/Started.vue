<template>
    <v-row class="px-2 black--text" 
        align="center" 
        :style="'background-color: ' + ppRGBA(participation.ppTournamentType.rgb,'.6')">
        <v-col cols="4" v-if="participation.position">
            <p-p-info small :label="$t('app.position')" 
                :value="participation.position" 
                :value2="participation.ppLeague.user_count"
            />
        </v-col>
        <v-col cols="4">
            <p-p-info small label="round" 
                :value="participation.ppLeague.round_count" 
                :value2="participation.ppTournamentType.rounds"
            />
        </v-col>
        <v-col cols="4">
                <v-row justify="center">
                <h3>
                    {{participation.locked ? 'LOCKED' : 'UNLOCKED'}}
                </h3>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
}
</script>