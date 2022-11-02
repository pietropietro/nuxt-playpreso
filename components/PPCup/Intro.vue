<template>
    <div>
        <v-row>
            <v-col>
                <p-p-info
                    label="p-cup"
                    :value="ppCup.ppTournamentType?.name"
                />
            </v-col>
            <v-col>
                <p-p-info
                    label="participants"
                    :value="ppCup.user_count ?? 0"
                />
            </v-col>
            <v-col cols="6" md="3" v-if="ppCup?.can_join">
                <p-p-info
                    label="cost"
                    :value="ppCup.ppTournamentType.cost"
                />
            </v-col>
            <v-col cols="6" md="3" v-if="ppCup?.can_join">
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