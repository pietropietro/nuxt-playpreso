<template>
    <v-row
        align="center"
        no-gutters
        class="h-100"
        :style="{ height: height}"
    >
        <v-col cols="12" class="mt-n4 pr-1" >
            <v-row no-gutters class="overline lh-1 mt-1">
                <v-spacer />
                <em-emoji size="1.5em" id="soccer"/>
                <v-spacer />
            </v-row>
            <v-row no-gutters  justify="center"
                v-for="(s,i) in standings" :key="i"
            >
                <v-col cols="auto" class="lh-1 text-center overline font-weight-bold mx-2">+{{s.gf}}</v-col>
                <v-col cols="auto" class="lh-1 text-center overline font-weight-bold mx-2">-{{s.ga}}</v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        standings: {type: Array},
        height: {type: String}
    }
}
</script>