<template>
    <v-col>
        <v-select :loading="loading" :items="ppTournamentTypes" v-model="typeModel" item-text="name" item-value="id"/> 
    </v-col>
</template>
<script>
export default {
    props:{
        model: {type: Number},
        setPPtt: {type: Function},
        cupsOnly: {type: Boolean}
    },
    data:()=>({ppTournamentTypes: [], loading: true}),
    computed:{
        typeModel:{
            get(){return this.model;},
            set(val){this.setPPtt(val);}
        }
    },
    methods:{
        async getPPtts(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.PPTOURNAMENTTYPES + (!!this.cupsOnly ? '?onlyCups=1' : ''));
            if(response && response.status === "success"){
                this.ppTournamentTypes = response.message;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getPPtts();
    }
}
</script>