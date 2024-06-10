<template>
    <div>
        <v-row >
            <v-spacer/>
            <em-emoji v-if="ppCup.ppTournamentType.emoji" :native="ppCup.ppTournamentType.emoji" size="5em"/>
            <v-spacer/>
        </v-row>
        <v-row>
            <v-col cols="6" v-if="ppCup?.can_join">
                <p-p-info
                    label="cost"
                    :value="ppCup.ppTournamentType.cost"
                />
            </v-col>
            <v-col cols="6" v-if="ppCup?.can_join">
                <p-p-tournament-join-row :ppTournamentTypeId="ppCup?.ppTournamentType.id" isPPCup/>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        ppCup: {type: Object}
    },
}
</script>