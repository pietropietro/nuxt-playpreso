<template>
    <v-row align="center" class="black-border-t">
        <v-col cols="4" v-if="participation.position">
            <p-p-info small :label="$t('app.position')" 
                :value="participation.position" 
                :value2="participation.ppLeague.user_count"
            />
        </v-col>
        <v-col cols="4" class="black-border-l black-border-r ">
            <p-p-info small label="round" 
                :value="participation.ppLeague.round_count" 
                :value2="participation.ppTournamentType.rounds"
            />
        </v-col>
        <v-col cols="4">
            <v-row justify="center" style="height:100%">
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