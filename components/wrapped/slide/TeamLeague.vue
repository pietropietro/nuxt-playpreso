<template>
    <v-container fluid 
        :style="{
            background: color,  
            height: '100px'
        }"  
        class="py-0"
    >
        <v-row align="center" justify="center" class="mt-10 pb-5 mx-2">
            <v-col cols="5">
                <p-p-info
                    small
                    :label="label"
                    :value="name"
                />
            </v-col>
            <v-col cols="3">
                <slot name="icon"/>
            </v-col>
            <v-col cols="4">
                <p-p-info
                    label="avg🅿️"
                    :value="points"
                    :value2="'(' +locks + ')'"
                />
            </v-col>
        </v-row>

        <template v-if="guesses">
            <v-row v-for="guess in guesses" :key="guess.id" justify="center" no-gutters class="my-1">
                <v-col cols="auto">
                    <guess-box-view
                        :guess="guess"
                        :match="guess.match"
                        :rgb="guess.ppTournamentType.rgb"
                        :open="true"
                        :setOpen="()=>null"
                    />
                </v-col>
            </v-row>
        </template>

        <template v-if="label == 'best team'">
            <div class="pepe-hand"/>
            <div class="pepe-hand-light"/>
        </template>

        <template v-else-if="label == 'worst team'">
            <div class="pepe-cigarette"/>
            <div class="pepe-cigarette-light"/>
        </template>

         <template v-else-if="label == 'best league'">
            <div class="pepe-pants"/>
            <div class="pepe-pants-light"/>
        </template>


        <template v-else-if="label == 'worst league'">
            <div class="pepe-body"/>
        </template>


    </v-container>
</template>
<script>
export default {
    props:{
        label: {type: String},
        name: {type: String},
        points: {type: Number},
        locks: {type: Number},
        color: {
            type: String
        },
        guesses: {type: Array},
    }
}
</script>

<style scoped>
.pepe-hand {
    position: absolute;
    bottom: 0;
    left: 10%;
    width: 80%;
    height: 80%;
    background-image: url('assets/png/pepe-hand.png');
    background-position: bottom ;
    background-size: contain; /* Scale the image to maintain aspect ratio while fitting within the container */

}

.pepe-hand-light {
    position: absolute;
    left: 10%;
    bottom: 0;
    width: 80%;
    height: 80%;
    background-image: url('assets/png/pepe-hand-light.png'); /* Replace with actual assets/png */
    background-position: bottom;
    animation: blinkLight 1s infinite; /* This applies the animation */
    background-size: contain; /* Scale the image to maintain aspect ratio while fitting within the container */

}


.pepe-cigarette {
    position: absolute;
    bottom: 0;
    left: 0%;
    width: 50%;
    height: 50%;
    background-image: url('assets/png/pepe-cigarette.png');
    background-position: bottom ;
    background-size: contain; /* Scale the image to maintain aspect ratio while fitting within the container */

}

.pepe-cigarette-light {
    position: absolute;
    left: 0%;
    bottom: 0;
    width: 50%;
    height: 50%;
    background-image: url('assets/png/pepe-cigarette-light.png'); /* Replace with actual assets/png */
    background-position: bottom;
    animation: blinkLight 1s infinite; /* This applies the animation */
    background-size: contain; /* Scale the image to maintain aspect ratio while fitting within the container */

}



.pepe-pants {
    position: absolute;
    bottom: 0;
    left: 20%;
    width: 60%;
    height: 60%;
    background-image: url('assets/png/pepe-pants.png');
    background-position: bottom ;
    background-size: contain; /* Scale the image to maintain aspect ratio while fitting within the container */

}

.pepe-pants-light {
    position: absolute;
    left: 20%;
    bottom: 0;
    width: 60%;
    height: 60%;
    background-image: url('assets/png/pepe-pants-light.png'); /* Replace with actual assets/png */
    background-position: bottom;
    animation: blinkLight 1s infinite; /* This applies the animation */
    background-size: contain; /* Scale the image to maintain aspect ratio while fitting within the container */

}



.pepe-body {
    position: absolute;
    bottom: 0;
    left: 70%;
    width: 30%;
    height: 30%;
    background-image: url('assets/png/pepe-body.png');
    background-position: bottom ;
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