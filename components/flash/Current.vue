<template>
    <div>
        <v-row no-gutters justify="center" align="center" class="mx-2">
            <v-col>
                <guess-box-view
                    :match="current.match"
                    :guess="current.guess"
                    :rgb="current.guess.ppTournamentType.rgb"
                    :open="openId && openId == current.guess.id"
                    :setOpen="(val)=>openId=val"
                />
            </v-col>
            <v-col v-if=!openId>
                <v-row>
                    <v-col>
                        <p-p-info label="cost" :value="current.lock_cost" small/>
                    </v-col>
                    <v-col>
                        <p-p-info label="prize" :value="current.lock_cost * current.guesses.length" small/>
                    </v-col>
                </v-row>
                <v-row justify="center">
                        <!-- countdown -->
                        <h3 class="ocrastd">current</h3>
                </v-row>
            </v-col>
        </v-row>
        <v-row class="pt-2" justify="center" no-gutters>
            <v-slide-group
                    class="px-2"
                    :show-arrows="!$vuetify.breakpoint.xs"
                    prev-icon="<"
                    next-icon=">"
                    :style="{ height: '80px'}"
                >
            <v-slide-item v-for="(guess,index) in current.guesses" :key="index">
                <div class="h-100 mx-4">
                    <guess-info
                        :color="ppRGBA(current.guess.ppTournamentType.rgb)"
                        :guess="guess"
                        :flipped="flipped"
                        :flip="()=>flipped=!flipped"
                    />
                </div>
            </v-slide-item>
        </v-slide-group>
        </v-row>
    </div>
</template>
<script>
export default{
    props:{
        current: {type: Object, required:true}
    },
    data(){
        return{
            openId: null,
            flipped: false
        }
    },
}
</script>