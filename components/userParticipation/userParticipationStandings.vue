<template >
    <v-container>
        <v-row class="pb-5">
            <h1>Standings</h1>
        </v-row>
        <v-row class="px-2" v-for="up in ups" align="center" :key="up.id">
            <v-col>
                <h2>{{up.position}}</h2>
            </v-col>
            <v-col>
                <h2>{{up.username}}</h2>
            </v-col>
            <v-col>
                <v-row justify="end">
                    <h2>{{up.score}}</h2>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    name:"userParticipationStandings",
    props: {
        ups: {type: Array}
    }
}
</script>