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
                    DETAIL: '/p-league/'
                },
            },
            API_ROUTES: {
                LOGIN: '/login',
                REGISTER: '/users',
                AVAILABLE_PPLEAGUE_TYPES: '/ppLeagueTypes',
                ACTIVE_PPL_PARTICIPATIONS: '/activePPLeaguesParticipations',
                PPLEAGUE: '/ppLeague/'
            }
        }
    }
});