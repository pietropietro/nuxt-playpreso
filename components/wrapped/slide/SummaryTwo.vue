<template>
    <v-container fluid fill-height style="position: relative; overflow:hidden; white-space: nowrap;" >
        <v-row style="background:  #003366; height: 30px; position: relative; overflow:hidden; white-space: nowrap;">
            <wrapped-rat class="rat-slow"/>
        </v-row>
        <v-row align="center" justify="center">
           
            <v-col>
                <p-p-info 
                class="px-0"
                    label="PRESO!"
                    :value="storyData.tot_preso"
                    :value2="storyData.tot_preso_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
            <v-col>
                <v-row justify="center">
                    <p-p-preso />
                </v-row>
            </v-col>
        </v-row>
        <v-row style="background:  #003366; height:30px;">
            <wrapped-rat class="rat-fast"/>
        </v-row>
        <v-row align="center" justify="center">
            
            <v-col>
                <p-p-info 
                    label="UNO X 2"
                    :value="storyData.perc_unox2 + '%'"
                    :value2="storyData.perc_unox2_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
            <v-col>
                <v-row justify="center">
                    <em-emoji id="white_check_mark" size="3em" />
                </v-row>
            </v-col>
        </v-row>
        <v-row style="background:  #003366; height:30px;">
            <wrapped-rat class="rat-medium"/>
        </v-row>
        <v-row align="center" justify="center">
            
            <v-col>
                <p-p-info 
                    label="UNDER/OVER 2.5"
                    :value="storyData.perc_uo25 + '%'"
                    :value2="storyData.perc_uo25_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
            <v-col>
                <v-row justify="center">
                    <em-emoji id="jigsaw" size="3em" />
                </v-row>
            </v-col>
        </v-row>
        <v-row style="background:  #003366; height:30px;">
            <wrapped-rat class="rat-slow"/>
        </v-row>
        <v-row align="center" justify="center">
            
            <v-col>
                <p-p-info 
                    label="GOL/NOGOL"
                    :value="storyData.perc_ggng + '%'"
                    :value2="storyData.perc_ggng_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
            <v-col>
                <v-row justify="center">
                    <em-emoji id="cherries" size="3em" />
                </v-row>
            </v-col>
        </v-row>
        <v-row style="background:  #003366; height:30px;">
            <wrapped-rat class="rat-medium"/>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        storyData: {type: Object}
    },
}
</script>

<style scoped>

/* Keyframes for moving the snake */

</style>

