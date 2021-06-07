<template>
    <preso-cup-table :id="cupId"/>
</template>
<script>
export default {
    data(){
        return{
            cupId: this.$route.params.cupId,
        }
    }
}
</script>
