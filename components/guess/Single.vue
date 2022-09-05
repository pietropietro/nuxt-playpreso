<template>
    <v-container fluid v-if="guess && match">
        <div style="height: 25vh" class="mb-2">
            <v-row style="height:100%" align="center" justify="center">
                <match-info :match="match"/>
            </v-row>
        </div>
        <guess-score-picker 
            style="height:60vh" 
            :guess="guess" 
        />
    </v-container>
    <error-wall v-else/>
</template>
<script>
export default {
    props:{
        guess: {type: Object, required: true},
        match: {type: Object, required: true},
    },
}
</script>