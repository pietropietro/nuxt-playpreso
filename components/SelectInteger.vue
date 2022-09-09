<template>
    <h1 :class="disabled ? '' : 'pointer'"  @click="onClick">
        {{computedModel + (computedModel === 3 ? '+' : '')}}
    </h1>
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