<template>
    <v-container fluid  class="pepe-background" style="position:relative; overflow:hidden; white-space: nowrap;" >
        
        <v-row justify="center" class="mt-10 pt-10">
                <h4>thank u {{currentUser.username.toLowerCase()}} <br> for not quitting</h4>
            </v-row>


        <v-row style="overflow:hidden; white-space: nowrap;">
            <!-- Background animation -->
        
            
            <v-row justify="center" no-gutters>
                <v-col cols="12" class="text-center">
                    <h4 class="">you're simple. you like
                        <span style="font-size:40px;"><b>{{storyData.most_lock_combination}}</b></span>
                    </h4>
                </v-col>
                <v-col cols="12" class="text-center">
                    <h5>you've locked it {{storyData.most_lock_combination_tot}} times.</h5>
                </v-col>
                <h5 v-if="lastYearData.most_lock_combination">last year was {{lastYearData.most_lock_combination}}.
                    {{ lastYearData.most_lock_combination ==  storyData.most_lock_combination ? ' again.' : ' you are growing up.'}}
                </h5>
            </v-row>
        </v-row>
        <div class="pepe-light"></div>
    </v-container>
</template>

<script>
export default {
    props: {
        storyData: { type: Object },
        lastYearData: { type: Object }
    },
}
</script>

<style scoped>
.pepe-background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('assets/png/pepe2.png');
    background-position: bottom;
}

.pepe-light {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('assets/png/pepe2-light.png'); /* Replace with actual assets/png */
    background-position: bottom;
    animation: blinkLight 1s infinite; /* This applies the animation */
}

@keyframes blinkLight {
    0%, 100% { opacity: 0.5;  } /* Start and end with half opacity and normal size */
    25% { opacity: 1; } /* Full opacity and slightly larger at quarter point */
    50% { opacity: 0.75;  } /* Three-quarter opacity, rotated and scaled */
    75% { opacity: 0.25;  } /* Quarter opacity, counter-rotated and larger */
    90% { opacity: 0.5;  } /* Quarter opacity, counter-rotated and larger */
}
</style>