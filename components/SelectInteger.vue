<template>
    <v-btn text
        class="always-black" 
        :disabled="disabled" 
        @click="()=>{computedModel === 3 ? computedModel = 0 : computedModel++}"
    >
        <h1 class="text-center">
            {{computedModel + (computedModel === 3 ? '+' : '')}}
        </h1>
    </v-btn>
</template>
<script>
export default {
    name: "LockScore",
    props: {
        disabled: {type: Boolean},
        model: {type: Number},
        setModel: {type: Function},
    },
    computed: {
        computedModel:{
            get(){return this.model},
            set(val){this.setModel(val)}
        }
    }
}
</script>
<style scoped>
.theme--light.v-btn.v-btn--disabled.always-black{
    color: black !important
}
</style>