<template>
    <v-row>
        <v-col>
            <p-p-info 
                label="p-cup"
                :value="ppTournamentType.name"
            />
        </v-col>
        <v-col>
            <p-p-info 
                label="participants"
                :value="ppTournamentType.user_count ?? 0"
            />
        </v-col>
        <slot name="cup-group" />
    </v-row>
</template>
<script>
export default {
    props:{
        ppTournamentType: {type: Object}
    }
}
</script>