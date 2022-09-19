<template>
    <v-row align="center">
        <v-col>
            <p-p-info small
                label="position"
                :value="'#' + standings.position"
            />
        </v-col>
        <v-col class="pl-5">
            <p-p-info small
                label="goals"
                :value="'+'+standings.gf"
                :value2="'-'+standings.ga"
            />
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        standings: {type: Object}
    }
}
</script>