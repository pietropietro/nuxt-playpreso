<template>
    <v-select label="p-area" v-model="computedModel" :items="ppAreas" item-text="name" item-value="id"/>
</template>
<script>
export default {
    props:{
        modelId: {type: Number},
        setModelId: {type: Function},
    },
    data(){
        return{
            ppAreas: []
        }
    },
    computed:{
        computedModel:{
            get(){
                return this.modelId;
            },
            set(val){
                this.setModelId(val);
            }
        }
    },
    methods:{
        async getPPAreas(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.PPAREA.GET);
            if(response && response.status === "success"){
                this.ppAreas = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getPPAreas();
    }
}
</script>