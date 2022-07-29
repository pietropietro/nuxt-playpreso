<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="ppCup && ppCup.levels">
        <cup-level-switch :length="Object.keys(ppCup.levels).length" 
            :level="selectedLevel" 
            :setLevel="(newLev)=>selectedLevel = newLev"
        />
        <cup-level-groups class="mb-10" :level="ppCup.levels[selectedLevel]"/>
    </v-container>
    <error-wall v-else />
</template>
<script>
export default {
    layout: "authenticated",
    data(){
        return{
            ppCupId: this.$route.params.cupId,
            loading: true,
            selectedLevel:  this.$route.query.level ? parseInt(this.$route.query.level) : 1,
            ppCup: null
        }
    },
    methods:{
        async getPPCup(){
            let response = await this.$api.call(this.API_ROUTES.PPCUP.GET + this.ppCupId, null, 'GET');
            if(response && response.status === "success"){
                this.ppCup = response.message;
                this.$store.commit('navigation/setActive', { 
                    title: this.ppCup.ppCupType.name, 
                    color: this.ppRGBA(this.ppCup.ppCupType)
                });
            }
            this.loading = false;
        },
    },
    async mounted(){
    console.log(this.$route.params, "params");
       await this.getPPCup();
    }
}
</script>
