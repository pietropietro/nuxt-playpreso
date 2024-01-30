<template>
    <v-container  class="pt-0" >
        <guess-scroll-home class="pt-2" title="unlocked"/>        
        <v-row class="mt-10 pt-5 " >
            <v-col cols="12" >
                <motd-home />
            </v-col>
        </v-row>
        <v-row
            class="" 
        >
            <p-p-league-available-list class="px-2 mb-5"/>
            <user-participation-enrolled-list />
        </v-row>
        <v-row  class="" 
        >
            <stats-top-users class="mt-5"/>
            <stats-last-preso class="mt-8 pb-5"/>
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
