<template>
    <v-row
        align="center"
        no-gutters
        class="h-100"
        :style="{ height: height}"
    >
        <v-col cols="12" class="mt-n4 pr-1" >
        <v-row no-gutters>
                <v-spacer />
                <div class="overline lh-1 mt-1">position</div>
                <v-spacer />
            </v-row>
            <v-row no-gutters 
                v-for="(s,i) in standings" :key="i"
            >
                <v-col cols="12" class="lh-1 text-center"><h4>{{s.position}}°</h4></v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props: {
        standings: {type: Array},
        height: {type: String}
    }
}
</script>