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
                PPLEAGUES: '/presoLeagues',
                PPLEAGUE:{
                    DETAIL: '/p-league/'
                },
                PPTOURNAMENTTYPE: {
                    DETAIL: '/p-tournament/type/'
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
                    GET: '/ppTournamentType/',
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