<template>
    <div>
        <!-- <div> -->
        <mundial-banner />
        <!-- </div> -->
        <v-container>
            <!-- <home-p-p-cups/> -->
            <home-p-p-leagues/>
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