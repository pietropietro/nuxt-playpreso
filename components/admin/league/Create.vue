<template>
    <v-container>
        <v-row align="center">
            <p-p-input-text placeholder="name" :value="nameModel" :setValue="(val)=>nameModel=val"/>
            <v-col>
                <v-select label="parent league" v-model="parentModel" :items="leagues" item-text="name" item-value="id"/>
            </v-col>
            <v-btn text :disabled="!nameModel" :loading="loading" @click="create">CREATE</v-btn>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{leagues: {type: Array}, refresh: {type:Function}},
    data:()=>({nameModel: null, parentModel:null, loading:false}),
    methods:{
        async create(){
            this.loading = true;
            let values = {
                "name" : this.nameModel,
                "parent_id" : this.parentModel,
            };
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.LEAGUE.CREATE, values, 'POST'
            );     
            await this.refresh();
            this.loading = false;
        }
    }
}
</script>