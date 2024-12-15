<template>
    <v-container fluid style="position: relative; height:100%" class="pt-10" >
        <v-row align="center" justify="center">
            <v-col>
                <v-row justify="center">
                    <em-emoji id="lock" size="3em" />
                </v-row>
            </v-col>
            <v-col>
                <p-p-info 
                class="px-0"
                    :value="storyData.tot_locks"
                    :value2="storyData.tot_locks_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
            <v-col v-if="lastYearData.tot_locks">
                <div class="overline lh-1">2023:{{ lastYearData.tot_locks }}</div>
                <v-img v-if="storyData.tot_locks > lastYearData.tot_locks" 
                  :src="require('@/assets/png/pepe-up.png')" :width="60" :height="60" contain
                />
                <v-img v-else 
                  :src="require('@/assets/png/pepe-down.png')" :width="60" :height="60" contain
                />
              </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col>
                <v-row justify="center">
                    <em-emoji id="parking" size="3em" />
                </v-row>
            </v-col>
            <v-col>
                <p-p-info 
                    :value="storyData.tot_points"
                    :value2="storyData.tot_points_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
            <v-col v-if="lastYearData.tot_points">
                <div class="overline lh-1">2023:{{ lastYearData.tot_points }}</div>
                <v-img v-if="storyData.tot_points > lastYearData.tot_points" 
                  :src="require('@/assets/png/pepe-up.png')" :width="60" :height="60" contain
                />
                <v-img v-else 
                  :src="require('@/assets/png/pepe-down.png')" :width="60" :height="60" contain
                />
              </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col>
              <h4 class="ocrastd text-center">
                AVG🅿️
              </h4>
            </v-col>
            <v-col>
                <p-p-info 
                    :value="storyData.avg_points"
                    :value2="storyData.avg_points_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
            <v-col v-if="lastYearData.avg_points">
                <div class="overline lh-1">2023:{{ lastYearData.avg_points }}</div>
                <v-img v-if="storyData.avg_points > lastYearData.avg_points" 
                  :src="require('@/assets/png/pepe-up.png')" :width="60" :height="60" contain
                />
                <v-img v-else 
                  :src="require('@/assets/png/pepe-down.png')" :width="60" :height="60" contain
                />
              </v-col>
        </v-row>
        <v-row align="center" justify="center">
            <v-col>
                <v-row justify="center">
                    <em-emoji id="x" size="3em" />
                </v-row>
            </v-col>
            <v-col>
                <p-p-info 
                    :value="storyData.tot_missed"
                    :value2="storyData.tot_missed_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
            <v-col v-if="lastYearData.tot_missed">
                <div class="overline lh-1">2023:{{ lastYearData.tot_missed }}</div>
                <v-img v-if="storyData.tot_missed < lastYearData.tot_missed" 
                  :src="require('@/assets/png/pepe-up.png')" :width="60" :height="60" contain
                />
                <v-img v-else 
                  :src="require('@/assets/png/pepe-down.png')" :width="60" :height="60" contain
                />
              </v-col>
        </v-row>
        <div class="pepe-book"/>
        <div class="pepe-book-light"/>
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
.pepe-book {
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 80%;
    background-image: url('assets/png/pepe-book.png');
    background-position: bottom ;
    background-size: contain; /* Scale the image to maintain aspect ratio while fitting within the container */

}

.pepe-book-light {
    position: absolute;
    left: 10%;
    bottom: 0;
    width: 80%;
    height: 80%;
    background-image: url('assets/png/pepe-book-light.png'); /* Replace with actual assets/png */
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

