<template>
    <v-container class="pt-0 px-0" >
        <v-skeleton-loader
            class="py-2 safe-area"
            height="90vh"
            type="table-heading, list-item-two-line, table-tfoot,  card-heading, list-item-avatar-three-line, 
                card-heading, table-tfoot, table-heading, list-item-two-line, table-tfoot,  card-heading, 
                list-item-avatar-three-line, card-heading, table-tfoot"
                v-show="this.$store.getters['homepageApi/isLoading']" 
        />
        
        <div v-show="!this.$store.getters['homepageApi/isLoading']">
        

            <guess-scroll-home class="pt-6 mb-4" title="unlocked"/> 
            
            <p-p-league-available-list class="my-10 mx-4"/>
             
            <flash-home class="my-10 mx-4"/>

            <motd-home class="my-10 mx-4"/>

            <p-p-section-card :helpHtml="enrolledDescription"
                title="ENROLLED" emojiId="roller_coaster" subtitle="your tournaments" v-show="!emptyEnrolled" >
                <template slot="content">
                    <user-participation-enrolled-list class="px-2" :setEmptyFlag="()=>emptyEnrolled=true"/>
                </template>
            </p-p-section-card>
            
            <p-p-ranking-view class="my-10 mx-4"/>

            <highlights-view class="my-10 mx-4"/>
            
        </div>
    </v-container>
</template>
<script>

import en from '~/locales/en.js'
import useHomepageApi from '~/composables/useHomepageApi';

export default {
    layout: "private",
    async mounted(){
        this.$store.dispatch(
            'navigation/updateTitle', 
            null        
        );

        const { fetchData } = useHomepageApi(this.$store, 'toolbar', this.getToolbarInfo);
        await fetchData();
    },
    data(){
        return{
            emptyEnrolled: false,
            enrolledDescription: en.enrolledDescription,
        }
    },
    methods:{
        async getToolbarInfo(){
            let response = await this.$api.call(this.API_ROUTES.STATS.MAIN_INFO);
            if(response && response.status === "success"){
                console.log('saving toolbar info', response.message);
                this.$store.commit('toolbarInfo/setInfoKey', {key: 'ppRanking', value: response.message.ppRanking});
                this.$store.commit('toolbarInfo/setInfoKey', {key: 'avg', value: response.message.avg});
                this.$store.commit('toolbarInfo/setInfoKey', {key: 'inactive', value: response.message.inactive});
                this.$store.commit('toolbarInfo/setInfoKey', {key: 'trophies', value: response.message.trophies});
                this.$store.commit('notification/updateUnreadCount', {unreadCount: response.message.unreadNotificationCount});
            }
            if(!response.message.unreadNotificationCount){
                if (Capacitor.isNativePlatform()) {
                    await Badge.clear();

                }
            }
        },
    }
}
</script>
