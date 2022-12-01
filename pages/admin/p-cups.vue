<template>
    <v-container>
        <v-row><h1>P-CUPS</h1></v-row>
        <v-row align="center">
            <admin-select-p-p-tournament-type cupsOnly :model="ppTTselected" :setPPtt="(val)=>ppTTselected=val"/>
            <v-col>
                <v-text-field label="slug" v-model="slugModel"/>
            </v-col>
            <v-col cols="3">
                <v-btn text @click="create" :disabled="!ppTTselected || !slugModel">create</v-btn>
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
        ppCups: [],
        ppTTselected: null,
        slugModel: null
    }),
    methods:{
        async create(){
            this.createLoading = true;
            let values = { 
                "slug": this.slugModel,
            }
            
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPCUP.CREATE + this.ppTTselected, values, 'POST'
            );

            if(response && response.status === "success"){
                console.log("created");
            }
            this.createLoading = false;
        },
        async getCups(){
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPCUP.GET + (this.ppTTselected ? ('?ppTournamentTypeId=' + this.ppTTselected) : '')
            );
            if(response && response.status === "success"){
                this.ppCups = response.message;
            }
            this.loading = false;
        }
    },
    async mounted(){
        await this.getCups();
    }
}
</script>
