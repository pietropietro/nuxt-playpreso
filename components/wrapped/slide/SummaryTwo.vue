<template>
    <v-container fluid  style="position: relative; height:100%" class="pt-10" >
        <v-row align="center" justify="center">
            <v-col v-if="lastYearData.tot_preso">
                <div class="overline lh-1">2023:{{ lastYearData.tot_preso }}</div>
                <v-img v-if="storyData.tot_preso > lastYearData.tot_preso" 
                  :src="require('@/assets/png/pepe-up.png')" :width="60" :height="60" contain
                />
                <v-img v-else 
                  :src="require('@/assets/png/pepe-down.png')" :width="60" :height="60" contain
                />
            </v-col>
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
        <v-row align="center" justify="center">
            <v-col v-if="lastYearData.perc_unox2">
                <div class="overline lh-1">2023:{{ lastYearData.perc_unox2 }}%</div>
                <v-img v-if="storyData.perc_unox2 > lastYearData.perc_unox2" 
                  :src="require('@/assets/png/pepe-up.png')" :width="60" :height="60" contain
                />
                <v-img v-else 
                  :src="require('@/assets/png/pepe-down.png')" :width="60" :height="60" contain
                />
            </v-col>
            <v-col>
                <p-p-info 
                    :value="storyData.perc_unox2 + '%'"
                    :value2="storyData.perc_unox2_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
            <v-col>
                <h4 class="ocrastd text-center">1-X-2</h4>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col v-if="lastYearData.perc_uo25">
                <div class="overline lh-1">2023:{{ lastYearData.perc_uo25 }}%</div>
                <v-img v-if="storyData.perc_uo25 > lastYearData.perc_uo25" 
                  :src="require('@/assets/png/pepe-up.png')" :width="60" :height="60" contain
                />
                <v-img v-else 
                  :src="require('@/assets/png/pepe-down.png')" :width="60" :height="60" contain
                />
            </v-col>
            <v-col>
                <p-p-info 
                    :value="storyData.perc_uo25 + '%'"
                    :value2="storyData.perc_uo25_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
            <v-col>
                <h4 class="ocrastd text-center">UNDER<br>OVER 2.5</h4>
            </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col v-if="lastYearData.perc_ggng">
                <div class="overline lh-1">2023:{{ lastYearData.perc_ggng }}%</div>
                <v-img v-if="storyData.perc_ggng > lastYearData.perc_ggng" 
                  :src="require('@/assets/png/pepe-up.png')" :width="60" :height="60" contain
                />
                <v-img v-else 
                  :src="require('@/assets/png/pepe-down.png')" :width="60" :height="60" contain
                />
            </v-col>
            <v-col>
                <p-p-info 
                    :value="storyData.perc_ggng + '%'"
                    :value2="storyData.perc_ggng_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
            <v-col>
                <h4 class="ocrastd text-center">GOL<br>NOGOL</h4>
            </v-col>
        </v-row>
        <div class="pepe-sandwich"/>
        <div class="pepe-sandwich-light"/>

    </v-container>
</template>
<script>
export default {
    props:{
        storyData: {type: Object},
        lastYearData: {type: Object}
    },
}
</script>


<style scoped>
.pepe-sandwich {
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 80%;
    background-image: url('assets/png/pepe-sandwich.png');
    background-position: bottom ;
    background-size: contain; /* Scale the image to maintain aspect ratio while fitting within the container */

}

.pepe-sandwich-light {
    position: absolute;
    left: 10%;
    bottom: 0;
    width: 80%;
    height: 80%;
    background-image: url('assets/png/pepe-sandwich-light.png'); /* Replace with actual assets/png */
    background-position: bottom;
    animation: blinkLight 1s infinite; /* This applies the animation */
    background-size: contain; /* Scale the image to maintain aspect ratio while fitting within the container */

}


@keyframes blinkLight {
    0%, 100% { opacity: 0.5;  } /* Start and end with half opacity and normal size */
    25% { opacity: 1; } /* Full opacity and slightly larger at quarter point */
    50% { opacity: 0.75;  } /* Three-quarter opacity, rotated and scaled */
    75% { opacity: 0.25;  } /* Quarter opacity, counter-rotated and larger */
    90% { opacity: 0.5;  } /* Quarter opacity, counter-rotated and larger */
}
</style>

