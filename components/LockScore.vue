<template>
    <v-col cols="5">
        <h1 v-if="!blocked" class="text-center">{{computedModel + (computedModel === 4 ? '+' : '')}}</h1>
        <h1 v-else-if="missed" class="text-center">x</h1>
        <h1 v-else class="text-center">{{guess_score + (guess_score === 4 ? '+' : '')}}</h1>
        <v-slider
            class="mx-4"
            :max="4"
            :min="0"
            v-model="computedModel"
            color="white"
            v-if="!blocked"
        ></v-slider>
    </v-col>
</template>
<script>
export default {
    name: "LockScore",
    props: {
        guess_score: {type: Number},
        model: {type: Number},
        setModel: {type: Function},
        blocked: {type: Boolean},
        missed:{type: Boolean}
    },
    computed: {
        computedModel:{
            get(){return this.model},
            set(val){this.setModel(val)}
        }
    }
}
</script>