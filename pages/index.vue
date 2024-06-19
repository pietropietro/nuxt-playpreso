<template>
    <v-container class="pt-0" >
        <guess-scroll-home class="py-5" title="unlocked"/>   
        <nuxt-link to="/p-cup/euro-24" class="no-decoration">
            <v-row justify="center" class="py-10">
                <h1>
                    EURO
                    <em-emoji id="sparkles" />
                    CUP
                </h1>
            </v-row>
        </nuxt-link>
        <v-row class="pt-0 pb-10" >
            <v-col cols="12" >
                <motd-home />
            </v-col>
        </v-row>
        
        <!-- <stats-top-users class="py-10"/> -->
        <p-p-ranking-view class="py-10"/>
        <!-- <stats-last-preso class="mt-8 pb-5"/> -->
        <v-row
            class="py-10" 
        >
            <p-p-league-available-list class="px-2 mb-5"/>
            <user-participation-enrolled-list />
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
