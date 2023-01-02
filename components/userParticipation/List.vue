<template>
    <v-row >
        <v-col class="pr-0" v-for="(up, index) in userParticipations" :key="index"
            :cols="participationCols(up, true)" :md="participationCols(up, false)" 
        >
            <template>
                <nuxt-link class="no-decoration"
                    :to="up.ppLeague_id ? ROUTES.PPLEAGUE.DETAIL + up.ppLeague_id
                        : ROUTES.PPCUP.DETAIL + up.ppCup_id + '/' + up.ppCupGroup_id" 
                >
                    <user-participation-card :participation="up" class="ma-1"/>
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