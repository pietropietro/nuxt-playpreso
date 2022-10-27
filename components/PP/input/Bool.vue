<template>
        <v-col>
            <p v-if="label" class="caption">{{label}}</p>
            <v-switch
                class="mb-0"
                color="yellow"
                v-model="model"
                @change="onChange"
            />
            <p v-if="labelTrue || labelFalse">{{model ? labelTrue : labelFalse }}</p>
        </v-col>
</template>
<script>
export default {
    props:{
        label: {type: String},
        value: {type: Boolean},
        setValue: {type: Function, required: true},
        labelTrue: {type: String},
        labelFalse: {type: String},
        onChange: {type: Function}
    },
    computed:{
        model:{
            get(){
                return this.value;
            },
            set(val){
                this.setValue(val);
            }
        }
    },
}
</script>