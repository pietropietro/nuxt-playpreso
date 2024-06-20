<template>
</template>
<script>

export default {
    layout: "authenticated",
    data(){
        return {
            page: 1,
            loading: false,
            motd: null,
            limit:10,
            total: null
        }
    },
    watch:{
        async page(){
            await this.getMotd();
        }
    },
    methods:{
        async getMotd(){
            this.loading=true;
            let response = await this.$api.call(this.API_ROUTES.PPRANKING.GET + '?limit=' + this.limit + '&page=' + this.page);
            if(response && response.status === "success"){
                this.ppRankings = response.message.ppRankings;
                this.total = response.message.total;
            }
            this.loading = false;
        },
    },
    async mounted(){
        this.$store.dispatch(
            'navigation/updateTitle', 
            {
                newTitle: 'P-RANKING',
                newEmoji: null,
                newOverline: null
            }        
        );
        await this.getMotd();
    }
}
</script>
