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
                    >
                        <v-slide-item v-for="(guess,index) in ppRM.guesses" :key="index" class="mx-1">
                            <div>
                                <guess-info :class="index === 0 ? 'ml-4' : 'mx-1'" :guess="guess" incrementalFont/>
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
        onLastLock: {type: Function}
    },
    computed:{
        allLocked(){
            let val = this.ppRM.guesses.filter((g) => !g.guessed_at).length === 0;
            return val;
        }
    },
    watch: {
        allLocked: function() {
            this.onLastLock(this.ppRM.ppRound_id);
        }
    }
}
</script>