<template>
    <v-container>
        <v-row><h1>P-CUPS</h1></v-row>
        <v-row align="center">
            <v-col>
                <v-select :loading="loading" :items="ppTournamentTypes" v-model="typeModel" item-text="name" item-value="id"/> 
            </v-col>
            <v-col>
                <v-text-field label="slug" v-model="slugModel"/>
            </v-col>
            <v-col cols="3">
                <v-btn text @click="create" :disabled="!typeModel || !slugModel">create</v-btn>
            </v-col>
        </v-row>
        <v-row v-if="ppCups">
            <v-col cols="6" v-for="(cup,index) in ppCups" :key="index">
                <v-card>
                    <v-card-title>
                        <h2>{{cup.ppTournamentType.name}}</h2>
                    </v-card-title>
                    <v-card-text class="mx-2">
                        <v-row>slug: {{cup.slug}}</v-row>
                        <v-row>created_at: {{cup.created_at}}</v-row>
                        <v-row>started: {{!!cup.started_at}}</v-row>
                        <v-row>finished: {{!!cup.finished_at}}</v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "admin",
    data:()=>({
        loading: true,
        createLoading:false,
        ppTournamentTypes: [],
        ppCups: [],
        typeModel: null,
        slugModel: null
    }),
    methods:{
        async getCupTypes(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.PPTOURNAMENTTYPES + '?onlyCups=1');
            if(response && response.status === "success"){
                this.ppTournamentTypes = response.message;
            }
            this.loading = false;
        },
        async create(){
            this.createLoading = true;
            let values = { 
                "slug": this.slugModel,
            }
            
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPCUP.CREATE + this.typeModel, values, 'POST'
            );

            if(response && response.status === "success"){
                console.log("created");
            }
            this.createLoading = false;
        },
        async getCups(){
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPCUP.GET + (this.typeModel ? ('?ppTournamentTypeId=' + this.typeModel) : '')
            );
            if(response && response.status === "success"){
                this.ppCups = response.message;
            }
            this.loading = false;
        }
    },
    async mounted(){
        await this.getCupTypes();
        await this.getCups();
    }
}
</script>
