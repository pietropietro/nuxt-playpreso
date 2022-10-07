<template>
    <div>
        <!-- <div> -->
        <nuxt-link to="/p-cup/mundial-22" class="no-decoration">
            <mundial-banner />
        </nuxt-link>
        <!-- </div> -->
        <v-container>
            <!-- <home-p-p-cups/> -->
            <home-p-p-leagues class="pt-4"/>
        </v-container>
    </div>
</template>
<script>
export default {
    layout: "authenticated",
    mounted(){
        this.$store.commit('navigation/setActive', { title: null, color: null});
    }
}
</script>