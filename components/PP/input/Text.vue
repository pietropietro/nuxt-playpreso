<template>
    <v-col>
        <p v-if="label" class="caption">{{label}}</p>
        <template v-if="!readonly && (forceEditMode || editingFlag === true)">
            <v-row no-gutters align="center">
                <v-btn text v-if="!!cancelAction" @click="cancelAction">
                    x
                </v-btn>
                <v-textarea v-if="textArea" ref="textfield" 
                    @keydown.enter="enterAction" 
                    v-model="model" 
                    @blur="onBlur"
                />
                <v-text-field v-else ref="textfield" 
                    @keydown.enter="enterAction" 
                    v-model="model" 
                    @blur="onBlur"
                    :placeholder="placeholder"
                />
                <v-btn 
                    :loading="loading" v-if="!plain" 
                    :disabled="!this.value" text 
                    @click.stop.native
                    @click="enterAction">
                    <h1>></h1>
                </v-btn>
            </v-row>
        </template>
        <template v-else>
            <v-card flat @click="showField">
                <h2 v-if="!html">
                    {{model ? model : 'INSERT'}}
                </h2>
                <span v-else v-html="model ? model : 'INSERT'"/>
            </v-card>
        </template>
    </v-col>
</template>
<script>
export default {
    props:{
        value: {type: String},
        setValue: {type: Function, required: true},
        enter: {type: Function},
        enterOnBlur: {type: Boolean},
        cancelAction: {type: Function},
        label: {type: String},
        placeholder: {type: String},
        html: {type: Boolean, default: false},
        forceEditMode: {type: Boolean, default: false},
        plain: {type:Boolean, default: false},
        loading: {type: Boolean},
        readonly: {type: Boolean},
        textArea: {type: Boolean}
    },
    data(){
        return{
            editingFlag: false,
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
        if(this.forceEditMode)this.showField();
    },
    methods:{
        showField(){
            if(this.readonly)return;
            this.editingFlag = true;
            setTimeout(() => {
                this.$refs.textfield.focus();
            })           
        },
        enterAction(){
            if((!this.value && this.forceEditMode) || this.loading) return;
            this.editingFlag = false;
            if(!!this.enter) {
                this.enter();
            }
        },
        onBlur(){
            setTimeout(()=>{
                this.editingFlag=false; 
                if(this.enterOnBlur)enterAction();
            },100);
        }
    }
}
</script>