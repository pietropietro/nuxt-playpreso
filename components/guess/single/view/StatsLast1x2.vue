<template>
    
        <!-- NESTED LOOPING DOES NOT WORK :( em-emoji issue -->
        <div>
            <v-row no-gutters align="center" justify="center"
                :style="{height: rowHeight}"
            >
                <v-col cols="auto" class="mx-1"
                    v-for="(m,ind) in match.homeTeam.lastMatches"
                    :key="ind"
                >
                    <em-emoji size="1.4em" class="emoji-mart-emoji" :id="emojiForWDL(m.wdl)" />
                </v-col>
            </v-row>
            <v-row no-gutters align="center" justify="center"
                :style="{
                    height: rowHeight,
                    backgroundColor: 'rgb('+rgb+')',
                }"
                
            >
                <v-col cols="auto" class="mx-1"
                    v-for="(m,ind) in match.awayTeam.lastMatches"
                    :key="ind"
                >
                    <em-emoji size="1.4em" class="emoji-mart-emoji" :id="emojiForWDL(m.wdl)" />
                </v-col>
            </v-row>
        </div>
        
</template>
<script>
export default {
    props:{
        match: {type: Object},
        rgb: {type: String},
        rowHeight: {type: String}
    },
    methods:{
        emojiForWDL(wdl){
            if(wdl === 'W') return 'white_check_mark';
            if(wdl === 'L') return 'x';
            return 'heavy_minus_sign';
        }
    }
}
</script>