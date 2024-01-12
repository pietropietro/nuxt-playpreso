<template>
    <v-container  class="pt-0" >
        <guess-home-scroll />        
        <v-row v-if="!$vuetify.breakpoint.mdAndUp">
            <v-col cols="12" >
                <p-p-counter />
            </v-col>
            <v-col class="pt-0 pt-md-3" cols="12" >
                <motd-home class="mt-n6 mt-md-5"/>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" 
                class="pa-0"
            >
                <p-p-counter v-if="$vuetify.breakpoint.mdAndUp"/>
                <p-p-league-available-list class="px-2 mb-5"/>
                <user-participation-enrolled-list />
            </v-col>
            <v-col cols="12">
                <motd-home v-if="$vuetify.breakpoint.mdAndUp" class="mt-n6 mt-md-5"/>
                <stats-top-users class="mt-5"/>
                <stats-last-preso class="mt-8 pb-5"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    layout: "authenticated",
}
</script>
