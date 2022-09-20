<template >
    <v-row no-gutters justify="end" class="text--end">
        <v-col cols="auto" align-self="end">
            <h3 class="standings-label">POINTS</h3>
        </v-col>
        <v-col cols="auto"  align-self="end">
            <div class="standings-label small text-overline">locked</div>
        </v-col>
        <v-col cols="auto"  align-self="end">
            <div class="standings-label small text-overline">preso</div>
        </v-col>
        <v-col cols="auto"  align-self="end">
            <div class="standings-label small text-overline">1x2</div>
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