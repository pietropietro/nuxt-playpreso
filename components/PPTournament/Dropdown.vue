<template>
    <v-card flat class="transparent">
        <v-card-title 
            class="white--text pa-2" 
            :style="'background-color: ' + ppRGBA(ppTT)" 
            v-on:click="setShow"
        >
            <h2>{{ppTournamentTypeTitle(ppTT)}}</h2>
        </v-card-title>
        <v-card-text :style="'height: 200px; background-color: ' + ppRGBA(ppTT, 0.6)" v-show="index === activeIndex">
            <v-row class="py-4">
                ciao
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    props: {
        ppTT: {type: Object, required: true},
        index: {type: Number},
        activeIndex: {type: Number},
        setShow: {type: Function, required: true}
    },
}
</script>