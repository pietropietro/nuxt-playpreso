<template >
    <div>
        <v-row class="px-2" v-for="up in ups" align="center" :key="up.id">
            <v-col>
                <h2>{{up.position}}.</h2>
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
    </div>
</template>
<script>
export default {
    name:"userParticipationStandings",
    props: {
        ups: {type: Array}
    }
}
</script>