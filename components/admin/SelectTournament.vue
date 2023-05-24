<template>
    <v-select :label="label" v-model="computedModel" :items="tournaments" item-text="name" item-value="id"/>
</template>
<script>
export default {
    props:{
        modelId: {type: Number},
        setModelId: {type: Function},
        label: {type: String}
    },
    data(){
        return{
            tournaments: []
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
        async getTournaments(){
            this.loading=true;
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET);
            if(response && response.status === "success"){
                this.tournaments = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getTournaments();
    }
}
</script>