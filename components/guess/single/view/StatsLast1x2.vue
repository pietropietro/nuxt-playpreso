<template>
    <v-row 
        align="center"
        no-gutters
        class="h-100"
        :style="{ height: height}"
    >
        <v-col cols="12" class="" v-if="match.homeTeam?.lastMatches">
            <!-- <v-row no-gutters class="overline lh-1 mt-1">
                <v-spacer />
                <div>last 3</div>
                <v-spacer />
            </v-row> -->

            <!-- NESTED LOOPING DOES NOT WORK :( em-emoji issue -->
            <v-row no-gutters justify="center"
                class=""
            >
                <v-col cols="auto" class="mx-1" 
                    v-for="(m,ind) in match.homeTeam.lastMatches"  
                    :key="ind"
                >
                    <em-emoji size="1.3em" class="emoji-mart-emoji" :id="emojiForWDL(m.wdl)" />
                </v-col>
            </v-row>
            <v-row no-gutters justify="center"
                class=""
            >
                <v-col cols="auto" class="mx-1" 
                    v-for="(m,ind) in match.awayTeam.lastMatches"  
                    :key="ind"
                >
                    <em-emoji size="1.3em" class="emoji-mart-emoji" :id="emojiForWDL(m.wdl)" />
                </v-col>
            </v-row>
        </v-col>
        <v-col v-else>error</v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        match: {type: Object},
        height: {type: String}
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