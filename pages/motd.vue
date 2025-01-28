<template>
<v-skeleton-loader
        class="py-2 safe-area"
        height="90vh"
        type="card-heading,
            card-heading, table-tfoot, 
            card-heading,
            card-heading, table-tfoot,
            card-heading,
            card-heading, table-tfoot,
            card-heading,
            card-heading, table-tfoot"
            v-if="!chart.length && loading"
    />
        <v-container v-else>
            <div class="overline lh-1 px-4 py-2" v-html="motdDescription" />

            <v-row no-gutters class="my-6">
                <v-col>
                    <v-slide-group
                        prev-icon="<"
                        next-icon=">"
                        ref="slider"
                    >
                        <v-slide-item
                            v-for="feature in features"
                            :key="feature"
                            class="mx-2"
                            ref="slideItem"
                        >
                            <v-chip
                                class="overline lh-1"
                                small
                                :outlined="selectedFeature==feature"
                                :color="selectedFeature==feature ? '' : 'transparent'"
                                :value="feature"
                                @click="selectedFeature = feature"
                                style="min-width:50px; opacity: 1 !important"
                            >
                                {{feature}}
                            </v-chip>
                        </v-slide-item>
                    </v-slide-group>
                </v-col>
            </v-row>

            <template v-if="selectedFeature=='matches'">
                <div
                    v-for="flash,i in flashList"
                    :key="flash.id"
                    :style="i % 2==0 ?
                            {backgroundColor: 'var(--v-primary-darken3)'}
                        : {}
                    "
                >
                    <div
                        class="pl-8 pt-4 caption"
                    >
                        #{{flash.id}}
                    </div>
                    <flash-verified
                        :verifiedFlash="flash"
                        :class="'pt-1'"
                    />
                </div>
                <v-row justify="center" class=" py-10 ">
                    <loading-page v-if="loading" :size="20" />
                    <h1 class="ocrastd" v-else @click="()=>page ++">+</h1>
                </v-row>
            </template>

            <template v-else-if="selectedFeature=='chart'">
                <motd-table />
            </template>

        </v-container>
</template>
<script>
import en from '~/locales/en.js'

export default {
    layout: "private",
    data(){
        return {
            page: 1,
            loading: false,
            chart: [],
            list: [],
            limit:10,
            total: null,
            features: ['matches', 'chart'],
            selectedFeature: 'chart',
            motdDescription: en.motdDescription,
        }
    },
    
    methods:{
        // async getMotdList(){
        //     this.loading=true;
        //     let response = await this.$api.call(this.API_ROUTES.MOTD.GET_LIST + '?limit=' + this.limit + '&page=' + this.page);
        //     if(response && response.status === "success"){
        //         this.chart = response.message.chart;
        //         this.total = response.message.total;
        //     }
        //     this.loading = false;
        // },
    },
    async mounted(){
        this.$store.dispatch(
            'navigation/updateTitle', 
            {
                newTitle: 'MOTD🧩',
                newEmoji: null,
                newOverline: null
            }        
        );
        // await this.getMotdChart();
    }
}
</script>
