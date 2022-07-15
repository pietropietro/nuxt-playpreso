<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="ppCup && ppCup.levels">
        <v-row justify="center" class="my-2">
            <v-img contain style="max-height: 80px" 
                :src="require('@/assets/img/cup/' + (selectedLevel - 1) + '.png')"
            />
        </v-row>
        <cup-level class="mb-10" :level="ppCup.levels[selectedLevel]"/>
        <v-pagination
            v-model="selectedLevel"
            :length="Object.keys(ppCup.levels).length"
            circle
            class="pagination-fixed no-arrows"
        />
    </v-container>
    <error-wall v-else />
</template>
<script>
export default {
    name: "PPCupTable",
    props:{
        id: {type: String, required: true},
    },
    data(){
        return{
            loading: true,
            selectedLevel: 1,
            ppCup: null
        }
    },
    methods:{
        async getPPCup(){
            let response = await this.$api.call(this.API_ROUTES.PPCUP.GET + this.id, null, 'GET');
            if(response && response.status === "success"){
                this.ppCup = response.message;
                //TODO edit values
                this.$store.commit('navigation/setActive', { 
                    title: this.ppCup.ppCupType.name, 
                    color: this.ppRGBA(this.ppCup.ppCupType)
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
