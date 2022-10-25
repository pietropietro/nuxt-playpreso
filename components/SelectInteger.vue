<template>
    <v-row no-gutters :justify="justify" class="no-selection">
        <h1 :class="disabled ? '' : 'pointer'"  @click="onClick">
            {{computedModel}}
        </h1>
        <h4 v-if="!max && !computedModel === 3">+</h4>
    </v-row>
</template>
<script>
export default {
    props: {
        disabled: {type: Boolean},
        model: {type: Number},
        setModel: {type: Function},
        justify: {type: String},
        limit: {type:Boolean, default:true},
        max:{type: Number}
    },
    computed: {
        computedModel:{
            get(){return this.model ?? 0},
            set(val){this.setModel(val)}
        },
        computedMax:{
            get(){return this.max ?? 3}
        }
    },
    methods: {
        onClick(){
            if(this.disabled) return;
            this.computedModel === this.computedMax ? this.computedModel = 0 : this.computedModel++;
        }
    }
}
</script>

<style scoped>
.theme--light.v-btn.v-btn--disabled.always-black{
    color: black !important
}
</style>