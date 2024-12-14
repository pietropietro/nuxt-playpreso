
<template>
    <v-container fluid fill-height style=" position:relative; overflow:hidden; white-space: nowrap;" class="py-0">
        <v-row style="  overflow:hidden; white-space: nowrap;" >
            <v-row justify="end" no-gutters>
                <wrapped-pine-tree v-for="n in 5" :key="n" class="pine-tree pt-4"/>
            </v-row>
        
        <!-- <v-row align="end">
            <v-col cols="12" style="z-index:20;"> -->
                <v-row justify="center" align="end" no-gutters>
                <h4>THANK YOU <span style="font-size:40px;"><b>{{currentUser.username.toUpperCase()}}</b></span></h4>
                <h4>FOR A GREAT YEAR TOGETHER</h4>
                </v-row>
            <!-- </v-col> -->
            <!-- <v-col cols="12" align-self="center"> -->
            <!-- </v-col> -->
        <!-- </v-row> -->
            <em-emoji id="sauropod" size="3em" class="fox"/>
            <v-row justify="start" no-gutters>
                <wrapped-pine-tree v-for="n in 4" :key="n" class="pine-tree px-2 pt-4"/>
            </v-row>
            <v-row justify="center" no-gutters>
                    <v-col cols="12" class="text-center">
                        <h4 class="">... stop locking
                            <span style="font-size:40px;"><b>{{storyData.most_lock_combination}}</b></span>
                        </h4>
                    </v-col>
                    <v-col cols="12" class="text-center">
                        <h5>you have done it {{storyData.most_lock_combination_tot}} times ...</h5>
                    </v-col>
                </v-row>
            <em-emoji id="t-rex" size="3em" class="fox t-rex"/>
            <wrapped-pine-tree v-for="n in 3" :key="n" class="pine-tree px-4 pt-4"/>
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
.pine-tree {
    top: 30px;
    animation: moveRight 2s linear infinite; /* Adjust time and other properties as needed */
}

.fox {
    width: 50px; /* Adjust as needed */
    height: 50px; /* Adjust as needed */
    background-size: cover; /* Ensure the image covers the element */
    animation: moveFox 8s linear infinite; /* New fox animation */
}

.t-rex {
    animation: moveTrex 8s linear infinite; /* New animation for T-Rex */
}

/* New T-Rex animation keyframes */
@keyframes moveTrex {
    0% { transform: scaleX(-1) translateX(-200%); } /* Start from the left */
    100% { transform: scaleX(-1) translateX(-500%); } /* Move to the right */
}

/* Fox animation keyframes */
@keyframes moveFox {
    0% { transform: translateX(800%) translateY(0%); }
    100% { transform: translateX(0%) translateY(200%);} /* Returns to start */
}


</style>