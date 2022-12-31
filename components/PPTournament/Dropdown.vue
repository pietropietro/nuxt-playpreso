<template>
    <v-card flat class="transparent">
        <v-card-title 
            class="white--text pa-2 pointer" 
            :style="'background-color: black'" 
            v-on:click="setShow"
        >
            <h2>{{ppTournamentTypeTitle(ppTT)}}</h2>
        </v-card-title>
        <v-card-text v-show="index === activeIndex">
            <v-row class="pa-4">
                <v-col>
                    <p-p-info label="leagues"
                        :value="ppTT.leagues.length"
                    />
                </v-col>
                <v-col class="ml-5">
                    <p-p-info label="cost"
                        :value="ppTT.cost"
                    />
                </v-col>
            </v-row>
            <p-p-tournament-join-row :ppTournamentTypeId="ppTT.id" :onError="onError"/>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    props: {
        ppTT: {type: Object, required: true},
        index: {type: Number},
        activeIndex: {type: Number},
        setShow: {type: Function, required: true},
        onError: {type: Function, required: true},
    },
}
</script>