<template>
    <v-row
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
                <!-- width is necessary for slider to work on page landing :( -->
                <div style="min-width:50px; ">
                    <guess-closed-box
                        :guess="guess"
                        :match="guess.match"
                        :rgb="guess.ppTournamentType.rgb"
                        :afterLock="()=>null"
                        :onClick="()=>onSelect(i)"
                        size="50px"
                        :withLogo="false"
                    />
                </div>
            </v-slide-item>
        </v-slide-group>
    </v-row>
</template>
<script>
export default {
    props:{
        onSelect: {type: Function}
    }
}
</script>