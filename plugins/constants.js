import Vue from 'vue'

Vue.mixin({
    data() {
        return {
            ROUTES: {
                HOME: '/',
                LOGIN: '/login',
                REGISTER: '/register',
                PPCUPS: '/presoCups',
                PPLEAGUES: '/presoLeagues',
                PPLEAGUE:{
                    // TYPE: {
                    //     DETAIL: '/p-league-type/'
                    // },
                    DETAIL: '/p-league/'
                },
            },
            API_ROUTES: {
                LOGIN: '/login',
                REGISTER: '/users',
                PPLEAGUE_TYPE: {
                   AVAILABLE: '/ppLeagueType/available',
                   JOIN: '/ppLeagueType/join/'
                },
                ACTIVE_PPL_PARTICIPATIONS: '/activePPLeaguesParticipations',
                PPLEAGUE: '/ppLeague/'
            }
        }
    }
});