<template>
    <v-app>
        <!-- <p-p-header />     -->
        <snackbar />
        <v-main>
            <guard-version-update v-if="$store.state.apiResponses.versionUpdateNeeded" />
            <guard-maintenance v-else-if="$store.state.apiResponses.maintenanceMode" />
            <nuxt v-else />
        </v-main>
    </v-app>
</template>
<script>
export default {
    // mounted () {
    //     this.$vuetify.theme.dark = false
    // }
}
</script>