<template>
    <p-p-scroll :infoCols="5" :infoMd="2" class="pa-0">
        <match-info slot="info" :match="ppRM.match"/>          
        <v-slide-item slot="slide-item" v-for="(guess,index) in ppRM.guesses" :key="index" class="mx-1">
            <div>
                <guess-info :class="index === 0 ? 'ml-4' : 'mx-1'" :guess="guess"/>
            </div>
        </v-slide-item>
    </p-p-scroll>
</template>
<script>
export default {
    props:{
        ppRM: {type: Object, required: true}
    }
}
</script>