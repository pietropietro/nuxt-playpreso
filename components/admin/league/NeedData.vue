<template>
    <v-container>
        <league-detail v-for="league in leagues" :key="league.id" :league="league"/>
    </v-container>
</template>
<script>
export default {
    data(){
        return{
            leagues: null
        }
    },
    async mounted(){
        console.log("get need data");
       await this.getNeedData();
    },
    methods:{
        async getNeedData(){
            let response = await this.$api.call(this.ADMIN_API_ROUTES.LEAGUE.GET_NEED_DATA);
            if(response && response.status === "success"){
                this.leagues = response.message;
            }
            this.loading = false;
        },
    }
}
</script>