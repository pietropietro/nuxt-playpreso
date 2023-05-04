<template>
    <v-row class="flex-column" style="height:100%" no-gutters  >
        <v-row v-for="i in 2" :key="i"
            align="center" 
            :style="{
                backgroundColor: i== 2 ? ppRGBA(rgb) : ''
            }"
        >
            <v-col cols="auto" class="ml-2">
                <team-logo 
                    :id="i==1 ? match.homeTeam.id : match.awayTeam.id" 
                    :size="24"  
                />
            </v-col>
            <v-col v-if="!logoOnly">
                <div class=" ocrastd text-uppercase ml-n2 "
                    :style="{
                        fontWeight:'bold', 
                        fontSize:'1.2rem !important', 
                        lineHeight: '0.6em'
                    }"
                >
                <!-- <div class=" overline lh-1 text-uppercase ml-n2 "
                    :style="{
                        fontWeight:'bold', 
                        fontSize:'1.2rem !important', 
                    }"
                > -->
                    {{ i==1 ? match.homeTeam.name.substr(0,3) : match.awayTeam.name.substr(0,3)}}
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
        logoOnly: {type: Boolean}
    }
}
</script>