<template>
    <v-select :label="label" v-model="computedModel" :items="leagues" item-text="name" item-value="id">
        <template slot="item" slot-scope="data">
            <emoji-flag :model="data.item.country" size="2em"/>
            <div class="overline ml-2 font-weight-bold ">{{ data.item.country?.substr(0,3) }}</div>
            <div class="overline ml-2">{{ data.item.name }}</div>
        </template>
        <template slot="selection" slot-scope="data">
            <emoji-flag :model="data.item.country" size="2em"/>
            <div class="overline ml-2 font-weight-bold ">{{ data.item.country?.substr(0,3) }}</div>
            <div class="overline ml-2">{{ data.item.name }}</div>
        </template>
    </v-select>
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
            leagues: []
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
        async getLeagues(){
            this.loading=true;
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET + '?parentOnly=true');
            if(response && response.status === "success"){
                this.leagues = response.message.leagues;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getLeagues();
    }
}
</script>