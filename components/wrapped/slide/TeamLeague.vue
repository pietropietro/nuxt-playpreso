<template>
    <v-container fluid fill-height
        :style="{background: color,  
                overflow: 'hidden', 
                whiteSpace: 'nowrap'
        }"  
        class="py-0"
    >
        <v-row align="center" justify="center" class="mt-10 pb-5 mx-2">
            <v-col cols="5">
                <p-p-info
                    small
                    :label="label"
                    :value="name"
                />
            </v-col>
            <v-col cols="3">
                <slot name="icon"/>
            </v-col>
            <v-col cols="4">
                <p-p-info
                    label="avg🅿️"
                    :value="points"
                    :value2="'(' +locks + ')'"
                />
            </v-col>
        </v-row>
        <template v-if="guesses">
            <v-row v-for="guess in guesses" :key="guess.id" justify="center" no-gutters class="my-1">
                <v-col cols="auto">
                    <guess-box-view
                        :guess="guess"
                        :match="guess.match"
                        :rgb="guess.ppTournamentType.rgb"
                        :open="true"
                        :setOpen="()=>null"
                    />
                </v-col>
            </v-row>
        </template>
       

    </v-container>
</template>
<script>
export default {
    props:{
        label: {type: String},
        name: {type: String},
        points: {type: Number},
        locks: {type: Number},
        color: {
            type: String
        },
        guesses: {type: Array},
    }
}
</script>
