<template >
    <v-row justify="end" align="end">
        <v-col cols="auto" sm="auto" class="" >
            <h3 class="standings-label lh-1">POINTS</h3>
        </v-col>
        <v-col cols="auto" sm="auto" class=""  v-if="totalCupLabel" >
            <h5 class="standings-label lh-1">CUP</h5>
        </v-col>
        <v-col cols="2" sm="auto" 
            class="standings-label lh-1 overline text-right " 
        >
            <div>locked</div>
            <div>preso</div>
            <div>1x2</div>
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