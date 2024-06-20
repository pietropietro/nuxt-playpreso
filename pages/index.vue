<template>
    <v-container class="pt-0 px-0" >
        <guess-scroll-home class="py-6" title="unlocked"/>   
        
        <motd-home class="py-10 my-5"/>
        
        <!-- <stats-top-users class="py-10"/> -->
        <p-p-ranking-view class="py-10"/>
        <!-- <stats-last-preso class="mt-8 pb-5"/> -->
        <v-row
            class="py-10 px-4" 
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
