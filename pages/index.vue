<template>
    <v-container class="pt-0 px-0" >
        <guess-scroll-home class="py-10" title="unlocked"/>   
        
        <p-p-league-available-list class="px-4 py-10 mb-5"/>
        
        <motd-home class="py-10 my-5"/>
        
        <p-p-ranking-view class="py-10"/>
        <!-- <v-row class="py-10">
            <div class="pointer">
                <em-emoji id="building_construction" size="5em"/>
                <span class="overline lh-1">MENU</span>
            </div>
        </v-row> -->
        <user-participation-enrolled-list />
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
