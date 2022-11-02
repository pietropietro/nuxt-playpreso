<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="ppCup && ppCup.levels">
        <p-p-cup-intro :ppCup="ppCup"/>
        <p-p-simple-pagination 
            :length="Object.keys(ppCup.levels).length" 
            :value="selectedLevel" 
            :setValue="(newLev)=>selectedLevel = newLev"
        >
            <h1 slot="selected-page" class="text-center">{{ppCup.ppTournamentType.cup_format[selectedLevel - 1].name}}</h1>
        </p-p-simple-pagination>
        <p-p-cup-level-groups class="mb-10" 
            :levelGroups="ppCup.levels[selectedLevel]" 
            :cupFormat="ppCup.ppTournamentType.cup_format"
        />
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
                    title: this.ppCup.ppTournamentType.name, 
                    rgb: this.ppCup.ppTournamentType.rgb
                });
            }
            this.loading = false;
        },
    },
    async mounted(){
       await this.getPPCup();
    }
}
</script>
