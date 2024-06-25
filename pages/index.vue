<template>
    <v-container class="pt-0 px-0" >
        <guess-scroll-home class="py-10" title="unlocked"/>   
        
        <p-p-league-available-list class="px-4 py-10 mb-5"/>
        
        <motd-home class="py-10 my-5"/>
        
        <p-p-ranking-view class="py-10"/>
        
        <!-- <user-participation-enrolled-list /> -->

        <v-row class="py-10 text-center ">
            <v-col>
                <nuxt-link :to="ROUTES.USER.DETAIL + currentUser.username" class="no-decoration">
                    <div class="pointer">
                        <em-emoji id="pig" size="3em"/>
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
