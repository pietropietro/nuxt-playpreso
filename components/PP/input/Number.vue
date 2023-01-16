<template>
    <v-col>
        <p v-if="label" class="caption">{{label}}</p>
        <template v-if="!readonly && (edit || flag === true)">
            <v-row class="mt-0 mb-0" align="center">
                <v-spacer/>
                <v-col class="mt-0 pt-0">
                    <v-text-field ref="textfield" @keydown.enter="() => enterAction()" 
                        type="number" v-model="model" @blur="()=>{
                            if(!edit && enterOnBlur)enterAction();
                            else{this.flag=false}
                        }"
                    />
                </v-col>
                <!-- TODO PREVENT CLICK BLUR -->
                <v-col v-if="!plain">
                    <v-btn text @click="enterAction"> <h1>--></h1> </v-btn>
                </v-col>
                <v-spacer/>
            </v-row>
        </template>
        <template v-else>
            <v-btn text @click="showField">
                <h2>
                    {{model ? model : 'no number'}}
                </h2>
            </v-btn>
        </template>
    </v-col>
</template>
<script>
export default {
    props:{
        value: {type: Number},
        setValue: {type: Function, required: true},
        label: {type: String},
        edit: {type: Boolean, default: false},
        enterOnBlur: {type: Boolean},
        plain: {type:Boolean, default: false},
        readonly: {type:Boolean, default: false},
        enter: {type: Function},
    },
    data(){
        return{
            flag: false,
        }
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
    mounted(){
        if(this.edit)this.showField();
    },
    methods:{
        showField(){
            if(this.readonly) return;
            this.flag = true;
            setTimeout(() => {
                this.$refs.textfield.focus();
            })           
        },
        enterAction(){
            if(!this.value && this.edit) return;
            this.flag = false;
            if(!!this.enter) {
                this.enter();
            }
        },
    }
}
</script>