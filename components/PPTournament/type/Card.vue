<template>
    <v-card class="white--text" :color="ppRGBA(ppTT)"> 
        <v-card-title>
            <h3>{{ppTournamentTypeTitle(ppTT)}}</h3>
        </v-card-title>
    </v-card>
</template>
<script>
export default {
    props: {
        ppTT: {type: Object, required: true},
    },
    data(){
        return {
            loading: true
        }
    },
}
</script>