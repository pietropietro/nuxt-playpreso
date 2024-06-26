<template>
    <v-container class="px-0">
        <v-row no-gutters v-for="ranking in ppRankings" :key="ranking.id" align="center">
            <v-col>
                <v-row align="center">
                    <v-col cols="auto">
                        <v-chip x-small color="transparent" ># {{ ranking.position }}</v-chip>
                    </v-col>
                    <v-col><user-name :user="ranking.user" /></v-col>
                </v-row>
            </v-col>
            <v-col class="pr-2" cols="auto"><h3>{{ ranking.points }}</h3></v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        ppRankings: {type: Array}
    },
}
</script>