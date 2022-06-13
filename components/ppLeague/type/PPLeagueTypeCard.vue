<template>
    <v-card @click="join(ppLT.id)" class="rounded-xl white--text " :color="ppRGBA(ppLT)">
        <v-row justify="end" align="center">
            <v-col cols="6" class="mt-2">
                <p-p-numeric-info small label="cost" :value="ppLT.cost" />
            </v-col>
        </v-row>
        <v-card-title >
            <h3>{{ppLT.type}} {{ppLT.level}}</h3>
        </v-card-title>
    </v-card>
</template>
<script>
export default {
    name: "PPLeagueTypeCard",
    props: {
        ppLT: {type: Object, required: true},
        join: {type: Function, required: true}
    },
    data(){
        return {
            loading: true
        }
    },
}
</script>