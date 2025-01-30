<template>
    <p-p-section-card  v-if="ppRankings" title="RAN-KING" emojiId="crown" subtitle="pp reputation system" :helpHtml="ppRankingDescription" >
        <template slot="content">
            <p-p-ranking-table class="px-5" :ppRankings="ppRankings" />
            
            <v-row justify="end" class="mt-1 mr-6">
                <nuxt-link to="/p-ranking" class="no-decoration">
                    <v-btn outlined x-small icon>
                        <h3>+</h3>
                    </v-btn>
                </nuxt-link>
            </v-row>
        </template>
    </p-p-section-card>
</template>
<script>
import useHomepageApi from '~/composables/useHomepageApi';
import en from '~/locales/en.js'

export default {
    data(){
        return {
            ppRankings: null,
            ppRankingDescription: en.ppRankingDescription
        }
    },
    methods:{
        async getPPRankings(){
            let response = await this.$api.call(this.API_ROUTES.PPRANKING.GET + '?limit=5');
            if(response && response.status === "success"){
                this.ppRankings = response.message.ppRankings;
                // this.userStat = response.message?.currentUserStat;
            }
        },
    },
    async mounted(){
        const { fetchData } = useHomepageApi(this.$store, 'ppranking', this.getPPRankings);
        await fetchData();
    },  
}
</script>