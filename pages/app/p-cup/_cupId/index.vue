<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="ppCup && ppCup.levels" class="px-0">
        <p-p-cup-intro :ppCup="ppCup"/>
        <p-p-cup-level-selection 
            :selectedLevel="selectedLevel" 
            :setSelectedLevel="(newLev)=>selectedLevel = newLev"
            :cupFormat="ppCup.ppTournamentType.cup_format"
            class="py-3"
        />
        <v-container>
            <p-p-cup-level-groups class="mb-10"
                :levelGroups="ppCup.levels[selectedLevel]"
                :cupFormat="ppCup.ppTournamentType.cup_format"
            />
        </v-container>
    </v-container>
    <error-wall v-else />
</template>
<script>
export default {
    layout: "private",
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
                this.selectedLevel = this.ppCup.currentLevel
                this.updateAppBarTitle();
            }
            this.loading = false;
        },
        updateAppBarTitle(){
            this.$store.dispatch(
                'navigation/updateTitle', 
                {
                    newTitle: this.ppTournamentTypeTitle(this.ppCup.ppTournamentType),
                    newEmoji: this.ppCup.ppTournamentType.emoji,
                    newOverline: 'P-CUP'
                }
            );
        }
    },
    async mounted(){
       await this.getPPCup();
    }
}
</script>
