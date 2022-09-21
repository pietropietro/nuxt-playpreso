<template >
    <v-row no-gutters justify="end" >
        <v-col cols="1" sm="auto" align-self="end">
            <h3 class="standings-label">POINTS</h3>
        </v-col>
        <v-col cols="2" sm="auto" 
            class="standings-label small text-overline text-right mr-n2 mr-sm-0" 
            align-self="end"
        >
            <div>locked</div>
            <div>preso</div>
            <div>1x2</div>
        </v-col>
    </v-row>
</template>
<style scoped>
    .standings-label{
        writing-mode: vertical-lr;
        text-orientation: sideways;
    }
    .standings-label.small{
        line-height: 1rem;
    }
</style>