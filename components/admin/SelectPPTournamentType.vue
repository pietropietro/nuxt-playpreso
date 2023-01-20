<template>
    <v-row align="center" class="overline">
        <v-col>
            <v-chip-group
                column
                v-model="typeModel"
                value="id"
                active-class="opacity-100"
            >
                <v-chip
                    small
                    :color="pptt.id === typeModel ? ppRGBA(pptt.rgb) : ppRGBA(pptt.rgb, 0.4)"
                    v-for="pptt in ppTournamentTypes" :key="pptt.id"
                    :value="pptt.id"
                >
                    <em-emoji v-if="pptt.emoji" :native="pptt.emoji" />
                    {{ppTournamentTypeTitle(pptt)}}
                </v-chip>
            </v-chip-group>
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
    data:()=>({ppTournamentTypes: [], loading: true, lala: []}),
    computed:{
        typeModel:{
            get(){return this.model;},
            set(val){
                this.setPPtt(val);
            }
        }
    },
    methods:{
        async getPPtts(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.PPTOURNAMENTTYPES.GET + (!!this.cupsOnly ? '?onlyCups=1' : ''));
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