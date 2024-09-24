<template>
    <v-row no-gutters :justify="justify" class="no-selection">
        <h1 :class="disabled ? '' : 'pointer'"  
            @click="onClick"
            v-if="!small"
            :style="big ? 'font-size:4em;' : ''"
        >
            {{computedModel}}
        </h1>
        <h4 v-else
            :class="disabled ? '' : 'pointer'"  
            @click="onClick"
        >
            {{computedModel}}
        </h4>
        <h4 v-if="maxNumber && computedModel === maxNumber"
            :style="small ? 'font-size:8px; margin-top: -4px;' : ''"
        >
            +
        </h4>
    </v-row>
</template>
<script>
export default {
    props: {
        disabled: {type: Boolean},
        model: {type: Number},
        setModel: {type: Function},
        justify: {type: String},
        maxNumber:{type: Number, default: 3},
        big: {type:Boolean, default: false},
        small: {type:Boolean, default: false}
    },
    computed: {
        computedModel:{
            //? for other users boxes where guessed_at is true but lock has to be hidden
            get(){return this.model != null ? this.model : '?'},
            set(val){this.setModel(val)}
        },
    },
    methods: {
        async onClick(){
            if(this.disabled) return;
            await this.triggerHapticFeedback();
            this.computedModel === this.maxNumber ? this.computedModel = 0 : this.computedModel++;
        }
    }
}
</script>

<style scoped>
.theme--light.v-btn.v-btn--disabled.always-black{
    color: black !important
}
</style>