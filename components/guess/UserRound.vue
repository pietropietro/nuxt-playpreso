<template>
    <v-row>
        <v-col 
            v-for="pprm, index in ppRMs" :key="index"
            cols="12" md="4"
            :class="index == 1 && !$vuetify.breakpoint.mdAndUp ? 'my-2' : ''"
        >
            <v-row justify="center" >
                <guess-single-card
                    :guess="pprm.guess"
                    :match="pprm.match"
                    :rgb="rgb"
                    :selectedGuessId="selectedGuessId"
                    :setSelectedGuessId="(val)=>selectedGuessId = val"
                    extended
                />
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        rgb: {tyep: String},
        ppRMs: {type: Array}
    },
    data(){
        return {
            selectedGuessId: null
        }
    }
}
</script>