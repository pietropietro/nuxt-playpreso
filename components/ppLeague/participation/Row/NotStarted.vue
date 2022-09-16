<template>
    <v-row v-if="!participation.ppLeague.started_at" 
        :style="'background-color: ' + ppRGBA(participation.ppTournamentType.rgb,'.6')" 
        justify="center" 
        align="center">
        <v-col cols="4">
            <p-p-info :label="$t('app.users')" :value="participation.ppLeague.user_count"/>
        </v-col>
        <v-col><h3 class="ocrastd">NOT STARTED</h3></v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
}
</script>