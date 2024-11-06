<template>
    <p-p-section-card title="HIGHLIGHTS" emojiId="champagne" subtitle="latest flex" v-if="highlights" >
        <template slot="content">
            <v-container class="py-0">
                <v-row no-gutters>
                    <v-col>
                        <v-slide-group
                            prev-icon="<"
                            next-icon=">"
                            ref="slider"
                        >
                            <v-slide-item
                                v-for="type in highlightTypes"
                                :key="type"
                                class="mx-2"
                                ref="slideItem"
                            >
                                <v-chip
                                    class="overline lh-1"
                                    small
                                    :outlined="selectedType==type"
                                    :color="selectedType==type ? '' : 'transparent'"
                                    :value="type"
                                    @click="()=>selectedType=type"
                                    style="min-width:50px; opacity: 1 !important"
                                >
                                    <template v-if="type == 'fullPresoRounds'">full round</template>
                                    <template v-else>{{type}}</template>
                                </v-chip>
                            </v-slide-item>
                        </v-slide-group>
                    </v-col>
                </v-row>
                <div v-if="selectedType=='preso'">
                    <highlights-preso 
                        :presoMatches="highlights.preso" 
                        :onMore="()=>$router.push(ROUTES.HIGHLIGHTS.PRESO)" 
                        class="pt-6"
                    />
                </div>
                <div v-else-if="selectedType=='trophies'">
                    <highlights-trophies :trophies="highlights.trophies" class="pt-6"/>
                </div>
                <div v-else-if="selectedType=='fullPresoRounds'">
                    <highlights-full-round :ppRounds="highlights.fullPresoRounds" class="pt-6"/>
                </div>
            </v-container>
        </template>
    </p-p-section-card>
</template>
<script>
import useHomepageApi from '~/composables/useHomepageApi';
export default {
    data(){
        return {
            highlights: null,
            highlightTypes: ['preso', 'trophies', 'fullPresoRounds'],
            selectedType: 'preso'
        }
    },
    methods:{
        async getHighlights(){
            let response = await this.$api.call(this.API_ROUTES.HIGHLIGHTS.GET);
            if(response && response.status === "success"){
                this.highlights = response.message;
                // this.userStat = response.message?.currentUserStat;
            }
        },
    },
    async mounted(){
        const { fetchData } = useHomepageApi(this.$store, 'highlights', this.getHighlights);
        await fetchData();
    },

}
</script>