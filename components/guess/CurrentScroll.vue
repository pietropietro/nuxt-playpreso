<template>
    <v-row
        no-gutters
        style="background-color:var(--v-primary-darken3);"
    >
        <v-slide-group
            prev-icon="<"
            next-icon=">"
            id="slider"
        >
            <v-slide-item
                v-for="(guess,i) in currentGuessList"
                :key="guess.id"
                class="mx-2"
            >
                <guess-box-view
                    :guess="guess"
                    :match="guess.match"
                    :rgb="guess.ppTournamentType.rgb"
                    :afterLock="()=>null"
                    :onUnlockedClick="()=>onSelect(i)"
                    :size="size"
                    :withLogo="false"
                />
            </v-slide-item>
        </v-slide-group>
    </v-row>
</template>
<script>
export default {
    props:{
        onSelect: {type: Function},
        size: {type: String, default: '50px'}
    }
}
</script>