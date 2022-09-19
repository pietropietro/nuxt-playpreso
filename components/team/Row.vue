<template>
    <v-row align="center" no-gutters justify="space-between" class="pl-2">
        <v-col>
            <h1>{{teamName}}</h1>
        </v-col>
        <v-col>
            <v-row v-if="teamStandings && !lockedText" align="center">
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
            <v-row v-else justify="center">
                <h3 class="ocrastd">{{lockedText}}</h3>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        teamStandings: {type: Object},
        teamName: {type: String},
        lockedText: {type: String}
    }
}
</script>