<template>
    <v-container class="pt-0 px-0" >
        <v-skeleton-loader
            class="py-2 safe-area"
            height="90vh"
            type="table-heading, list-item-two-line, table-tfoot,  card-heading, list-item-avatar-three-line, 
                card-heading, table-tfoot, table-heading, list-item-two-line, table-tfoot,  card-heading, 
                list-item-avatar-three-line, card-heading, table-tfoot"
                v-show="this.$store.getters['homepageLoading/isLoading']" 
        />
        <div v-show="!this.$store.getters['homepageLoading/isLoading']">
            <v-row  justify="center" class="pt-5">
                <a href="https://chat.whatsapp.com/IW3eSFNNa7UItIJA4iEaS0" target="blank" class="no-decoration">
                    <div class="overline lh-1">whatsapp
                        <v-chip small color="green">
                            <em-emoji id="speech_balloon"/>
                        </v-chip>
                        group
                    </div>
                </a>
            </v-row>
            <guess-scroll-home class="py-10" title="unlocked"/>   
            <p-p-league-available-list class="py-10 mb-5"/>
            
            <motd-home class="py-10 my-5"/>
            
            <p-p-ranking-view class="py-10"/>

            <highlights-view class="py-10"/>


            <div class="py-10" v-if="!emptyEnrolled">
                <v-row  class="mx-4 mb-5 ocrastd"
                    style="font-size:30px; font-weight: bold; background:linear-gradient(#1a00e3, transparent); border-radius: 10px;"
                    align="center"
                >
                    <v-col>ENROLLED</v-col>
                    <em-emoji style="position:absolute; left:66%" id="roller_coaster" size="3em"/>
                </v-row>
                <user-participation-enrolled-list class="px-5" :setEmptyFlag="()=>emptyEnrolled=true"/>
            </div>
            
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
    layout: "authenticated",
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
