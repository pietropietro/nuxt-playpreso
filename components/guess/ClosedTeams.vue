<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center" 
            justify="center"
            class="text-center"
            :style="{
                height: size +'px',
                background: i== 2 ? ppRGBA(rgb) : ppRGBA(rgb, 0.6) 
            }"
        >
            <v-col v-if="withLogo" cols="4" class="pa-0">
                <team-logo 
                    :id="i==1 ? match.homeTeam.id : match.awayTeam.id" 
                    size="30"  
                />
            </v-col>
            <v-col :cols="withLogo ? 6 : ''" class="pa-0">
                <h3 class="ocrastd text-uppercase" v-if="size > 30">
                   {{i==1 ? match.homeTeam.name.substr(0,3) : match.awayTeam.name.substr(0,3)}}
                </h3>
                <h4 class="ocrastd text-uppercase" v-else>
                   {{i==1 ? match.homeTeam.name.substr(0,3) : match.awayTeam.name.substr(0,3)}}
                </h4>

            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        match: {type: Object},
        rgb: {type: String},
        size: {type: Number, default: 49},
        withLogo: {type:Boolean, default: true}
    },
}
</script>