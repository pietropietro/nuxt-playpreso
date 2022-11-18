<template >
    <v-row no-gutters justify="end" align="end">
        <v-col cols="1" sm="auto" class="mr-4 mr-sm-0">
            <h3 class="standings-label">POINTS</h3>
        </v-col>
        <v-col cols="1" sm="auto" class="mr-sm-0" v-if="totalCupLabel" >
            <h5 class="standings-label">CUP</h5>
        </v-col>
        <v-col cols="2" sm="auto" 
            class="standings-label small text-overline text-right mr-n1 mr-sm-0" 
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
    .standings-label.small{
        line-height: 1rem;
    }
</style>