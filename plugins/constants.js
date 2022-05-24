import Vue from 'vue'

Vue.mixin({
    data() {
        return {
            ROUTES: {
                HOME: '/',
                LOGIN: '/login',
                REGISTER: '/register',
                PPCUPS: '/presoCups',
                PPLEAGUES: '/presoLeagues'
            },
            API_ROUTES: {
                LOGIN: '/login',
                REGISTER: '/users',
                AVAILABLE_PPLEAGUE_TYPES: '/ppLeagueTypes',
                ACTIVE_PPL_PARTICIPATIONS: '/activePPLeaguesParticipations'
            }
        }
    }
});