<template>
    <v-row align="center" justify="space-between">
        <v-col class="pl-0" cols="auto">
            <h1>{{teamName}}</h1>
        </v-col>
        <v-col v-if="teamStandings" cols="auto" class="pr-0">
            <v-row align="center">
                <v-col>
                    <p-p-info small
                        label="position"
                        :value="'#' + teamStandings.position"
                    />
                </v-col>
                <v-col class="pl-5">
                    <p-p-info small
                        label="goals"
                        :value="'+'+teamStandings.gf"
                        :value2="'-'+teamStandings.ga"
                    />
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        teamStandings: {type: Object},
        teamName: {type: String}
    }
}
</script>