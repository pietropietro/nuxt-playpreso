<template>
    <v-container class="pt-0 px-0" >
        <guess-scroll-home class="py-10" title="unlocked"/>   

        <v-row justify="center" class="py-4 text-center">
            <nuxt-link class="no-decoration" to="/p-cup/champions-24-25">
                <h1>CHAMPIONS CUP</h1> 
                <h1>💫</h1>
            </nuxt-link>
        </v-row>
        
        <p-p-league-available-list class="py-10 mb-5"/>
        
        <motd-home class="py-10 my-5"/>
        
        <p-p-ranking-view class="py-10"/>

        <highlights-view class="py-10"/>


        <div class="py-10">
            <v-row  class="mx-4 mb-5 ocrastd"
                style="font-size:30px; font-weight: bold; background:linear-gradient(#1a00e3, transparent); border-radius: 10px;"
                align="center"
            >
                <v-col>ENROLLED</v-col>
                <em-emoji style="position:absolute; left:66%" id="roller_coaster" size="3em"/>
            </v-row>
            <user-participation-enrolled-list class="px-5" />
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
    }
}
</script>
