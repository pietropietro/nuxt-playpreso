<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center" 
            justify="center"
            class="text-center"
            :style="{
                height: '49px',
                background: i== 2 ? ppRGBA(rgb) : ppRGBA(rgb, 0.6) 
            }"
        >
            <v-col cols="4" class="pa-0">
                <team-logo 
                    :id="i==1 ? match.homeTeam.id : match.awayTeam.id" 
                    :size="30"  
                />
            </v-col>
            <v-col cols="6" class="pa-0">
                <h3 class="ocrastd text-uppercase">
                   {{i==1 ? match.homeTeam.name.substr(0,3) : match.awayTeam.name.substr(0,3)}}
                </h3>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        match: {type: Object},
        rgb: {type: String},
    },
}
</script>