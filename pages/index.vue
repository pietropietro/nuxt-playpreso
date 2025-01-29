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
            
            <p-p-scroll-menu />
             
            <!-- <p-p-section-card :title="currentUser.points.toString()" emojiId="parking" subtitle="preso-points" v-if="!emptyEnrolled" /> -->
            <flash-home class="my-10 mx-4"/>

            <p-p-league-available-list class="my-10 mx-4"/>

            
            <motd-home class="my-10 mx-4"/>

            <p-p-section-card title="ENROLLED" emojiId="roller_coaster" subtitle="your tournaments" v-show="!emptyEnrolled" >
                <template slot="content">
                    <user-participation-enrolled-list class="px-2" :setEmptyFlag="()=>emptyEnrolled=true"/>
                </template>
            </p-p-section-card>
            
            <p-p-ranking-view class="my-10 mx-4"/>

            <highlights-view class="my-10 mx-4"/>


            
            
            <v-row class="py-10 text-center ">
                <v-col>
                    <nuxt-link :to="ROUTES.USER.DETAIL + currentUser.username" class="no-decoration">
                        <div class="pointer">
                            <em-emoji id="speaking_head_in_silhouette" size="3em"/>
                        </div>
                        <div class="mt-n2">
                            <span class="overline lh-1">PROFILE</span>
                        </div>
                    </nuxt-link>
                </v-col>
                <v-col>
                    <div class="pointer" @click="$store.dispatch('menu/updateMenu', { newVal: true });">
                        <em-emoji id="control_knobs" size="3em"/>
                    </div>
                    <div class="mt-n2">                    
                        <span class="overline lh-1">MENU</span>
                    </div>
                </v-col>
            </v-row>
            
        </div>
    </v-container>
</template>
<script>
export default {
    layout: "private",
    mounted(){
        this.$store.dispatch(
            'navigation/updateTitle', 
            null        
        );
    },
    data(){
        return{
            emptyEnrolled: false
        }
    }
}
</script>
