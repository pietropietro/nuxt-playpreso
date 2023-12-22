<template>
    <v-container fluid fill-height class="py-0" style="background: #800080;  position: relative; overflow:hidden; white-space: nowrap;" >
        <v-row  style="background:  #330033; height: 30px; position: relative; overflow:hidden; white-space: nowrap;">
            <div class="snake snake-slow"></div>
        </v-row>
        <v-row align="center" justify="center">
            <v-col>
                <v-row justify="center">
                    <em-emoji id="lock" size="3em" />
                </v-row>
            </v-col>
            <v-col>
                <p-p-info 
                class="px-0"
                    label="locks"
                    :value="storyData.tot_locks"
                    :value2="storyData.tot_locks_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
        </v-row>
        <v-row style="background:  #330033; height:30px;">
            <div class="snake" />
        </v-row>
        <v-row align="center" justify="center">
            <v-col>
                <v-row justify="center">
                    <em-emoji id="parking" size="3em" />
                </v-row>
            </v-col>
            <v-col>
                <p-p-info 
                    label="points"
                    :value="storyData.tot_points"
                    :value2="storyData.tot_points_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
        </v-row>
        <v-row style="background:  #330033; height:30px;">
            <div class="snake snake-fast" />
        </v-row>
        <v-row align="center" justify="center">
            <v-col>
                <v-row justify="center">
                    <em-emoji id="abacus" size="3em" />
                </v-row>
            </v-col>
            <v-col>
                <p-p-info 
                    label="avg🅿️"
                    :value="storyData.avg_points"
                    :value2="storyData.avg_points_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
        </v-row>
        <v-row style="background:  #330033; height:30px;">
            <div class="snake snake-medium" />
        </v-row>
        <v-row align="center" justify="center">
            <v-col>
                <v-row justify="center">
                    <em-emoji id="x" size="3em" />
                </v-row>
            </v-col>
            <v-col>
                <p-p-info 
                    label="missed"
                    :value="storyData.tot_missed"
                    :value2="storyData.tot_missed_rank + '°/' + storyData.ranked_users"
                />
            </v-col>
        </v-row>
        <v-row style="background:  #330033; height:30px;">
            <div class="snake" />
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
.snake {
  position: absolute;
  width: 160px; /* Size of the snake */
  height: 20px;
  background-color:  #4d004d;
  border-radius: 15px; /* Rounded appearance */
  animation: moveSnake 8s linear infinite; /* Animation */
  z-index: 1;
}

/* Snake's eyes */
.snake::before {
  content: '';
  position: absolute;
  top: 5px;
  left: 140px;
  width: 5px;
  height: 5px;
  background-color: black;
  border-radius: 50%; /* Circular eyes */
  z-index: 2;
}

/* Snake's tongue */
.snake::after {
  content: '';
  position: absolute;
  bottom: 0px;
  left: 155px;
  width: 30px;
  height: 5px;
  background-color: red;
  animation: moveTongue 1s ease-in-out infinite; /* Tongue animation */
}

/* Keyframes for moving the snake */
@keyframes moveSnake {
  0% {
    left: -90px;
  }
  100% {
    left: 100%;
  }
}

/* Keyframes for animating the tongue */
@keyframes moveTongue {
  0%, 100% {
    transform: translateX(0) rotate(0);
    width: 8px; /* Tongue is fully inside the mouth */
  }
  50% {
    width: 25px; /* Tongue extends out */
  }
}

.snake-slow {
  animation: moveSnakeSlow 12s linear infinite;
}

.snake-medium {
  animation: moveSnakeMedium 8s linear infinite;
}

.snake-fast {
  animation: moveSnakeFast 4s linear infinite;
}

/* Keyframes for moving the snake with different speeds */
@keyframes moveSnakeSlow {
  0% {
    left: -160px;
  }
  100% {
    left: 100%;
  }
}

@keyframes moveSnakeMedium {
  0% {
    left: -160px;
  }
  100% {
    left: 100%;
  }
}

@keyframes moveSnakeFast {
  0% {
    left: -160px;
  }
  100% {
    left: 100%;
  }
}
</style>

