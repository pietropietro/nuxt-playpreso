import Vue from 'vue'

Vue.mixin({
    data() {
        return {
            ROUTES: {
                HOME: '/',
                LOGIN: '/login',
                REGISTER: '/register',
                RECOVER: '/recover',
                PPCUP: {
                    DETAIL: '/p-cup/'
                },
                PPLEAGUE:{
                    DETAIL: '/p-league/',
                },
                USER: {
                    DETAIL: '/user/'
                }
            },
            API_ROUTES: {
                LOGIN: '/login',
                REGISTER: '/user',
                USER:{
                    GET: '/user/'
                },
                USER_PARTICIPATION: {
                    PPLEAGUES:  '/userParticipation/ppLeagues'
                },
                PPLEAGUE: {
                    GET: '/ppLeague/',
                },
                PPTOURNAMENTTYPE: {
                    AVAILABLE: '/ppTournamentType/available',
                    JOIN: '/ppTournamentType/join/'
                },
                PPCUP: {
                    GET: '/ppCup/',
                    GROUP: {
                        GET: '/ppCupGroup/'
                    }
                }
            }
        }
    }
});