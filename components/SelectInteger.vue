<template>
    <v-row no-gutters :justify="justify">
        <h1 :class="'noselection ' + disabled ? '' : 'pointer'"  @click="onClick" style="user-select: none;">
            {{computedModel}}
        </h1>
        <h4 v-if="computedModel === 3">+</h4>
    </v-row>
</template>
<script>
export default {
    name: "LockScore",
    props: {
        disabled: {type: Boolean},
        model: {type: Number},
        setModel: {type: Function},
        justify: {type: String}
    },
    computed: {
        computedModel:{
            get(){return this.model ?? 0},
            set(val){this.setModel(val)}
        }
    },
    methods: {
        onClick(){
            if(this.disabled) return;
            this.computedModel === 3 ? this.computedModel = 0 : this.computedModel++;
        }
    }
}
</script>
<style scoped>
.theme--light.v-btn.v-btn--disabled.always-black{
    color: black !important
}
</style>