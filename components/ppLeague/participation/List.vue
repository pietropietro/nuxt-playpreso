<template>
    <v-row >
        <v-col class="pr-0" v-for="(up, index) in userParticipations" :key="index"
            :cols="participationCols(up, true)" :md="participationCols(up, false)" 
        >
            <template v-if="up.ppLeague">
                <nuxt-link :to="ROUTES.PPLEAGUE.DETAIL + up.ppLeague_id" class="no-decoration">
                    <p-p-league-participation-card :participation="up" class="ma-1"/>
                </nuxt-link>
            </template>

        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        userParticipations: {type: Array}
    },
    methods: {
        participationCols(participation, mobile){
            // if(!participation.ppLeague.started_at){
                // return '6';
            // }
            return '12';

        }
    },
}
</script>