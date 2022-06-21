<template>
    <v-card class="white--text" :color="ppRGBA(ppLT)"> 
        <v-card-title>
            <h3>{{ppLeagueTypeTitle(ppLT)}}</h3>
        </v-card-title>
    </v-card>
</template>
<script>
export default {
    name: "PPLeagueTypeCard",
    props: {
        ppLT: {type: Object, required: true},
    },
    data(){
        return {
            loading: true
        }
    },
}
</script>