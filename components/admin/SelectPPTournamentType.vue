<template>
    <v-row align="center" class="overline lh-1">
        <v-col cols="auto">P-TOURNAMENT-TYPE</v-col>
        <v-col>
            <v-select
                :loading="loading"
                :items="ppTournamentTypes"
                v-model="typeModel"
                :item-text="getFieldText"
                item-value="id"
            />
        </v-col>
    </v-row>
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
            let response = await this.$api.call(this.ADMIN_API_ROUTES.PPTOURNAMENTTYPES.GET + (!!this.cupsOnly ? '?onlyCups=1' : ''));
            if(response && response.status === "success"){
                this.ppTournamentTypes = response.message;
            }
            this.ppTournamentTypes.push({name:'ALL', level: '', id: null});
            this.loading = false;
        },
        getFieldText (item)
        {
            return `${item.name} ${item.level}`.toUpperCase();
        }
    },
    async mounted(){
        await this.getPPtts();
    }
}
</script>