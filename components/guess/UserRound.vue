<template>
    <v-row>
        <v-col 
            v-for="pprm, index in ppRMs" :key="index"
            cols="12" md="4"
        >
            <guess-single-card :guess="pprm.guess"  :match="pprm.match" :color="color"/>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        color: {tyep: String},
        ppRMs: {type: Array}
    }
}
</script>