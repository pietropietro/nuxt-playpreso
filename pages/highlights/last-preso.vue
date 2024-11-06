<template>
    <loading-page v-if="!presoSummaries && loading" />
    <v-container v-else>
        <highlights-preso :presoMatches="presoSummaries" 
            :onMore="()=>{page++}"
            :loading="loading"
        />
    </v-container>
</template>

<script>
export default {
    layout: "authenticated",
    data(){
        return {
            page: 1,
            loading: false,
            presoSummaries: [],
        }
    },
    watch:{
        async page(){
            await this.getLatestPreso();
        }
    },
    methods:{
        async getLatestPreso(){
            this.loading=true;
            let response = await this.$api.call(this.API_ROUTES.HIGHLIGHTS.PRESO + '?page=' + this.page);
            if(response && response.status === "success"){
                this.presoSummaries = [...this.presoSummaries, ...response.message.preso];
            }
            this.loading = false;
        },
    },
    async mounted(){
        this.$store.dispatch(
            'navigation/updateTitle', 
            {
                newTitle: 'LAST PRESOs',
                newEmoji: null,
                newOverline: null
            }        
        );
        await this.getLatestPreso();
    }
}
</script>