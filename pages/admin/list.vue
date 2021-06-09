<template>
    <loading-page v-if="!euroMatches"/>
    <v-container v-else>
        <nuxt-link to="/admin">back</nuxt-link>
        <admin-update-match class="my-5" v-for="(match,i) in euroMatches" :key="i" :match="match"/>
    </v-container>
</template>
<script>
export default {
    data(){
        return{
            euroMatches: null,
        }
    },
    async mounted(){
        await this.getMatches();
    },
    methods:{
        async getMatches(){
            let values = [
                {'action' : "getEuroMatches"},
            ]
            this.euroMatches = await this.$api.call(values);
        }
    }
}
</script>