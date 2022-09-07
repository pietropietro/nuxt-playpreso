<template>
    <p-p-scroll v-if="ppTournamentTypes.length" infoAlign="start">
        <p-p-info slot="info" label="available" :value="ppTournamentTypes.length"/>
        <v-slide-item 
            slot="slide-item" 
            v-for="(ppTT,index) in ppTournamentTypes" 
            :key="index" 
            class="mx-1"
        >
            <div>
                <p-p-tournament-dropdown 
                    :ppTT="ppTT" 
                    :index="index"
                    :activeIndex="activeIndex"
                    :onError="getAvailable"
                    :setShow="() => activeIndex === index ? activeIndex = null : activeIndex = index"
                />
            </div>
        </v-slide-item>
    </p-p-scroll>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            activeIndex: null,
            ppTournamentTypes: [],
        }
    },
    methods:{
        async getAvailable(){
            let response = await this.$api.call(this.API_ROUTES.PPTOURNAMENTTYPE.AVAILABLE);
            if(response && response.status === "success"){
                this.ppTournamentTypes = response.message;
            }
            this.loading = false;
        },

    },
    async mounted(){
        await this.getAvailable();
    }
}
</script>