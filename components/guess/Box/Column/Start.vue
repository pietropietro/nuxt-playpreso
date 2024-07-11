<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center"
            justify="center"
            class="text-center"
            :style="{
                height: size +'px',
                width: size +'px',
                background: shades[i-1]
            }"
        >
            <v-col class="pa-0">
                <team-logo v-if="i==1"
                    :id="match.homeTeam.id"
                    :name="match.homeTeam.name"
                    size="30"
                    :country="match.league.country != match.homeTeam.country ? match.homeTeam.country : ''"
                />
                <template v-if="i==2" >
                    <em-emoji
                        :native="guess.ppTournamentType?.emoji"
                        size="2em"
                    />
                </template>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        match: {type: Object},
        guess: {type: Object},
        shades: {type: Array},
        size: {type: Number, default: 49},
    },
}
</script>
