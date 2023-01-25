<template>
    <v-row align="center" class="flex-nowrap">
        <v-col cols="auto" class="pa-0">
            <match-info-short :match="ppRM.match" :withTime="false"/>
        </v-col>
        <v-col style="overflow:auto;" class="pr-0">
            <v-container class="pa-0">
                <v-slide-group
                    :show-arrows="!$vuetify.breakpoint.xs"
                    prev-icon="<"
                    next-icon=">"
                    :style="{ height: '80px'}"
                  
                >
                    <v-slide-item v-for="(guess,index) in ppRM.guesses" :key="index">
                        <div class="h-100 mx-4">
                            <guess-info
                                :presoColor="color"
                                :color="color"
                                :guess="guess"
                                :flipped="flipped"
                                :flip="()=>flipped=!flipped"
                            />
                        </div>
                    </v-slide-item>
                </v-slide-group>
            </v-container>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        ppRM: {type: Object, required: true},
        onLastLock: {type: Function},
        color: {type: String}
    },
    data:()=>({flipped: false}),
    // computed:{
    //     allLocked(){
    //         //avoids http call
    //         if(!this.onLastLock)return null;
    //         let val = this.ppRM.guesses.filter((g) => !g.guessed_at).length === 0;
    //         return val;
    //     }
    // },
    // watch: {
    //     allLocked: async function(val, oldVal) {
    //         if(!this.onLastLock)return;
    //         if(oldVal != val){
    //             await this.onLastLock(this.ppRM.ppRound_id);
    //         }
    //     }
    // }
}
</script>