<template>
    <v-app>
        <!-- <p-p-header />     -->
        <snackbar />
        <v-main>
            <nuxt />
        </v-main>
    </v-app>
</template>
<script>
export default {
    mounted () {
        this.$vuetify.theme.dark = false
    }
}
</script>