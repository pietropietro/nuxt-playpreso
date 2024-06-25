<template>
    <v-row align="center">
        <v-col v-if="participation.position">
            <p-p-info small label="position" 
                :value="participation.position" 
                :value2="participation.user_count"
            />
        </v-col>
        <v-col>
            <!-- <p-p-info small label="round" 
                :value="participation.ppLeague.round_count" 
                :value2="participation.ppTournamentType.rounds"
            /> -->
            <p-p-info small label="round" 
                value="stro" 
                :value2="participation.ppTournamentType.rounds"
            />
        </v-col>
        <v-col v-if="participation.unlocked">
            <v-row justify="center" style="height:100%">
                <h3>{{participation.unlocked}} UNLOCKED</h3>
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