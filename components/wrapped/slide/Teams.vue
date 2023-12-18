<template>
    <v-container fluid fill-height style="background:   #330000;  overflow:hidden; white-space: nowrap;"  class="py-0">
        <v-row style="height:10vh; background:  #ff1a1a;"></v-row>
        <v-row >
            <v-col cols="12" class="pb-5" >
                <v-row align="center">
                    <v-col>
                        <p-p-info
                            small
                            class="px-0"
                            label="common team"
                            :value="storyData.most_team_name"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <team-logo :id="storyData.most_team_id" size="50" />
                    </v-col>
                    <v-col cols="auto" class="mx-2">
                        <p-p-info
                            class="px-0"
                            label="avg🅿️"
                            :value="storyData.most_team_avg_points"
                            :value2="'(' +storyData.most_team_tot_locks + ')'"
                        />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <v-row align="center">
                    <v-col>
                        <p-p-info
                            small
                            class="px-0"
                            label="best team"
                            :value="storyData.high_team_name"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <team-logo :id="storyData.high_team_id" size="50" />
                    </v-col>
                     <v-col cols="auto" class="mx-2">
                        <p-p-info
                            class="px-0"
                            label="avg🅿️"
                            :value="storyData.high_team_avg_points"
                            :value2="'(' +storyData.high_team_tot_locks + ')'"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>

        <v-row style="height:25vh; background:  #ff1a1a;">
            <div class="golf-course">
                <div class="putter">
                    <div class="putter-handle"></div>
                    <div class="putter-head"></div>
                </div>
                <div class="golf-ball"></div>
                <div class="hole">
                    <div class="flagstick">
                        <div class="flag"></div>
                    </div>
                </div>
            </div>
        </v-row>

        <v-row>
            <v-col cols="12">
                <v-row  align="center">
                    <v-col>
                        <p-p-info
                            small
                            class="px-0"
                            label="common league"
                            :value="storyData.most_league_name"
                        />
                    </v-col>
                    <v-col cols="auto" >
                        <!-- <v-row justify="center"> -->
                            <emoji-flag size="3em" :model="storyData.most_league_country"/>
                        <!-- </v-row> -->
                    </v-col>
                     <v-col cols="auto" class="mx-2">
                        <p-p-info
                            small
                            class="px-0"
                            label="avg🅿️"
                            :value="storyData.most_league_avg_points"
                            :value2="'(' +storyData.most_league_tot_locks + ')'"
                        />
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="12">
                <v-row align="center">
                
                    <v-col>
                        <p-p-info
                            small
                            class="px-0"
                            label="best league"
                            :value="storyData.high_league_name"
                        />
                    </v-col>
                     <v-col cols="auto">
                        <!-- <v-row justify="center"> -->
                            <emoji-flag size="3em" :model="storyData.high_league_country"/>
                        <!-- </v-row> -->
                    </v-col>
                     <v-col cols="auto" class="mx-2">
                        <p-p-info
                            class="px-0"
                            label="avg🅿️"
                            :value="storyData.high_league_avg_points"
                            :value2="'(' +storyData.high_league_tot_locks + ')'"
                        />
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row style="height:10vh; background:  #ff1a1a;"></v-row>
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
.golf-course {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.putter {
    position: absolute;
    bottom: 0;
    left: 15%;
    transform-origin: bottom left;
    animation: swingPutter 1s ease-in forwards, layPutter 2s ease-in-out 1s forwards;
}

.putter-handle {
    width: 5px;
    height: 120px;
    background-color: #330000;
}

.putter-head {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 45px;
    height: 5px;
    background-color: #c0c0c0;
    border-radius: 2px;
}

@keyframes swingPutter {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(-25deg); }
    100% { transform: rotate(0deg); }
}

@keyframes layPutter {
    0% { bottom: 0; left: 15%; opacity: 1; }
    100% { bottom: -10px; left: 25%; transform: rotate(-90deg); opacity: 1; }
}

.golf-ball {
    position: absolute;
    bottom: 10px;
    left: 25%;
    width: 15px;
    height: 15px;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
    animation: rollBall 4s ease-in-out 1s forwards;
}

@keyframes rollBall {
    0% { left: 25%; }
    50% { left: 85%; }
    100% { left: 85%; bottom: 2px; opacity: 1; }
}

.hole {
    position: absolute;
    bottom: 0;
    right: 10%;
    width: 20px;
    height: 10px;
    border-radius: 0 0 10px 10px;
    background-color: black;
}

.flagstick {
    position: absolute;
    bottom: 0;
    right: 12%;
    width: 3px;
    height: 100px;
    background-color: #330000;
}

.flag {
    position: absolute;
    top: 10px;
    left: -15px;
    width: 30px;
    height: 15px;
    background-color: #ffffff;
    clip-path: polygon(0 0, 100% 50%, 0 100%);
    transform: rotateZ(-30deg);
}



</style>

