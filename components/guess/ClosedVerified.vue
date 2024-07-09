<template>
    <v-row>
        <v-col>
            <v-row v-for="i in 2" :key="i"
                align="center"
                justify="center"
                class="text-center"
                :style="{
                    height: size +'px',
                    background: i== 2 ? ppRGBA(rgb, 0.4) : ppRGBA(rgb, 0.2)
                }"
            >
                <v-col class="pa-0">
                    <team-logo v-if="i==1"
                        :id="match.homeTeam.id"
                        :name="match.homeTeam.name"
                        size="30"
                    />
                    <template v-if="i==2" >
                        <em-emoji  
                            :native="guess.ppTournamentType?.emoji" 
                            size="2em"
                        />
                    </template>
                </v-col>
            </v-row>
        </v-col>
        <v-col>
            <v-row v-for="i in 2" :key="i"
                align="center"
                justify="center"
                class="text-center"
                :style="{
                    height: size +'px',
                    background: i== 1 ? ppRGBA(rgb, 0.4) : ppRGBA(rgb, 0.2)
                }"
            >
            
                <v-col class="pa-0">
                    <team-logo v-if="i==1"
                        :id="match.awayTeam.id"
                        :name="match.awayTeam.name"
                        size="30"
                    />
                    <div class="text-center" v-else>
                        <guess-single-view-points :guess="guess" />
                    </div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>

export default {
    props:{
        match: {type: Object},
        guess: {type: Object},
        rgb: {type: String},
        size: {type: Number, default: 49},
        withLogo: {type:Boolean, default: true},
    },
}
</script>