<template >
    <v-row justify="end" align="end">
        <v-col cols="auto" 
            class="standings-label text-right " 
        >
            <h3>POINTS</h3>
            <h5 v-if="totalCupLabel">CUP</h5>
            <div class="overline lh-1">locked</div>
            <div class="overline lh-1">preso</div>
            <div class="overline lh-1">1x2</div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        totalCupLabel: {type: Boolean}
    }
}
</script>
<style scoped>
    .standings-label{
        writing-mode: vertical-lr;
        text-orientation: sideways;
    }

</style>