<template>
    <v-container>
        <home-p-p-leagues/>
    </v-container>
</template>
<script>
export default {
    layout: "authenticated",
    mounted(){
        this.$store.commit('navigation/setActive', { title: null, color: null});
    }
}
</script>