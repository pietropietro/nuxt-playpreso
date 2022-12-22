<template>
    <p-p-slider :infoCols="3" :infoMd="2" class="pa-0">
        <match-info-short slot="info" :match="ppRM.match"/>
        <v-slide-item slot="slide-item" v-for="(guess,index) in ppRM.guesses" :key="index" class="mx-1">
            <div>
                <guess-info :class="index === 0 ? 'ml-4' : 'mx-1'" :guess="guess" incrementalFont/>
            </div>
        </v-slide-item>
    </p-p-slider>
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