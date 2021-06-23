<template>
    <loading-page v-if="!euroMatches"/>
    <v-container v-else-if="euroMatches.length > 0">
        <nuxt-link to="/admin">back</nuxt-link>
        <v-row>
            <v-col v-for="(match,i) in euroMatches" :key="i" cols="12" md="4" sm="6">
                <admin-update-match class="my-5" :match="match" :refresh="refresh"/>
            </v-col>
        </v-row>
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
            this.euroMatches = null;
            let values = [
                {'action' : "getEuroMatches"},
            ]
            this.euroMatches = await this.$api.call(values);
            this.euroMatches.sort((a,b) => new Date(a.date_start) - new Date(b.date_start));
        },
        refresh(){
            this.getMatches();
        }
    }
}
</script>