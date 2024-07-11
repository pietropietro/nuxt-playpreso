<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center"
            justify="center"
            class="text-center"
            :style="{
                height: size +'px',
                width: size +'px',
                background: shades[i%2]
            }"
        >
            <v-col class="pa-0">
                <team-logo 
                    v-if="i==1"
                    :id="match.awayTeam.id"
                    :name="match.awayTeam.name"
                    size="30"
                    :country="match.league.country != match.awayTeam.country ? match.awayTeam.country : ''"
                />
                <template v-else>
                    <guess-match-result v-if="!guess.verified_at"
                        :guess="guess" 
                        :match="match" 
                    />

                    <guess-single-view-points
                        v-else  
                        :guess="guess" 
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