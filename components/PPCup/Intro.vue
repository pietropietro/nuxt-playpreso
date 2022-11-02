<template>
    <div>
        <p-p-tournament-join-row v-if="ppCup?.can_join" :ppTournamentTypeId="ppCup?.ppTournamentType.id" isPPCup/>
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
                    :value="ppCup.ppTournamentType?.user_count ?? 0"
                />
            </v-col>
            <v-col>
                <p-p-info
                    label="cost"
                    :value="ppCup.ppTournamentType.cost"
                />
            </v-col>
            <slot name="cup-group" />
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