<template>
    <div>
        <v-row v-for="i in 2" :key="i"
            align="center" 
            :style="{
                height: '45px',
                borderRadius: rounded? (i == 1 ? `${borderRadiusValue} ${borderRadiusValue} 0 0` : `0 0 ${borderRadiusValue} ${borderRadiusValue}`) : '', // Apply rounded corners to the first and last elements
                background: i== 2 ? ppRGBA(rgb) : ppRGBA(rgb, 0.6) 
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
                    {{getTeamText(i)}}
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        match: {type: Object},
        rgb: {type: String},
        big: {type: Boolean},
        rounded: {type: Boolean},
        logoOnly: {type: Boolean}
    },
    data(){
        return{
            borderRadiusValue: '8px',
        }
    },
    methods:{
        getTeamText(index){
            let team =  index == 1 ? this.match.homeTeam :  this.match.awayTeam;
            if(!this.big){
                return team.name.substr(0,3);
            }
            return team.name.toUpperCase();
        }
    }
}
</script>