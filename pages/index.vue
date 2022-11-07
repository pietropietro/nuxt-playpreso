<template>
    <p-p-cup-mundial-home />
</template>
<script>
export default {
    layout: "authenticatedHome",
    mounted(){
        this.$store.commit('navigation/setActive', { title: null, color: null});
    }
}
</script>