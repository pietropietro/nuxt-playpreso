<template>
    <v-row>
        <v-col 
            v-for="pprm, index in ppRMs" :key="index"
            :cols="$vuetify.breakpoint.mobile ? '12' : '4'"
        >
            <guess-single-card :guess="pprm.guess"  :match="pprm.match"/>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        ppRMs: {type: Array}
    }
}
</script>