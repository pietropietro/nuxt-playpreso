<template>
    <v-container fluid fill-height style="background:#00a111; overflow:hidden; white-space: nowrap;" class="py-0">
        <v-row style="height:50%; background:#00a111" align="end">
            <v-col cols="12">
                <v-row justify="center" >
                    <h1 class="">THANK YOU {{currentUser.username.toUpperCase()}}</h1>
                    <h4>FOR A GREAT YEAR TOGETHER</h4>
                </v-row>
            </v-col>
            <v-col cols="12" align-self="center">
                <v-row justify="center" no-gutters>
                    <v-col cols="12" class="text-center">
                        <h4 class="">you are one of the
                            <span style="font-size:40px;"><b>{{storyData.ranked_users}}</b></span>
                            users
                        </h4>
                    </v-col>
                    <v-col cols="12" class="text-center">
                        <h5>who made it this far</h5>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row style="background:#004d1a; height: 50%; overflow:hidden; white-space: nowrap;" >
                <!-- <div class="pine-tree" style="width:50px; height:50px; background-color:red;"></div> -->
            <wrapped-pine-tree v-for="n in 12" :key="n" class="pine-tree px-2 pt-4"/>
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
    animation: moveRight 2s linear infinite; /* Adjust time and other properties as needed */
}

@keyframes moveRight {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(100%); /* Adjust the value as needed */
    }
}
</style>

