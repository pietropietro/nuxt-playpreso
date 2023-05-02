<template>
    <v-row class="flex-column" style="height:100%" no-gutters  >
        <v-row align="center" >
            <v-col cols="auto" class="ml-2" style="z-index:2">
                <team-logo :id="match.homeTeam.id" :size="24"  />
            </v-col>
            <v-col>
                <div class=" lh-1 overline text-uppercase ml-n2 "
                    :style="{fontWeight:'bold', fontSize:'1.2rem !important'}"
                >
                    {{match.homeTeam.name.substr(0,3)}}
                </div>
            </v-col>
        </v-row>
        <v-row align="center"
            :style="{backgroundColor: ppRGBA(rgb)}"
        >
            <v-col cols="auto" class="ml-2">
                <team-logo :id="match.awayTeam.id" :size="24" />
            </v-col>
            <v-col>
                <div class="lh-1 text-uppercase ml-n2 "
                    :style="{fontWeight:'bold', fontSize:'1.2rem !important'}"
                >
                    {{match.awayTeam.name.substr(0,3)}}
                </div>
            </v-col>
        </v-row>
    </v-row>
</template>
<script>
export default {
    props:{
        match: {type: Object},
        rgb: {type: String},
    }
}
</script>