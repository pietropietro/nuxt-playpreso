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
            v-if="!flashList.length && loading"
    />
    <v-container class="px-0" v-else-if="flashList.length > 0">
        <div class="overline lh-1 px-4 py-2" v-html="flashMatchDescription" />
        <div
            v-for="flash,i in flashList"
            :key="flash.id" 
            :style="i % 2==0 ?
                    {backgroundColor: 'var(--v-primary-darken3)'} 
                : {}
            " 
        >
            <div 
                class="pl-8 pt-4 ocrastd"
                style="font-size:14px;"
            
            >
                event #{{flash.id}}
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
            flashList: [],
            limit:10,
            total: null,
            flashMatchDescription: en.flashMatchDescription
            // ppTournamentType: null
        }
    },
    watch:{
        async page(){
            await this.getLastFlash();
        }
    },
    methods:{
        async getLastFlash(){
            this.loading=true;
            let response = await this.$api.call(this.API_ROUTES.FLASH.GET_LIST + '?limit=' + this.limit + '&page=' + this.page);
            if(response && response.status === "success"){
                this.flashList = [...this.flashList, ...response.message.flashList]; 
                // this.ppTournamentType = response.message.ppTournamentType;
            }
            this.loading = false;
        },
    },
    async mounted(){
        this.$store.dispatch(
            'navigation/updateTitle', 
            {
                newTitle: 'FLASH⚡',
                newEmoji: null,
                newOverline: null
            }        
        );
        await this.getLastFlash();
    }
}
</script>
