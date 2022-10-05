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
                LOGIN: '/user/login',
                REGISTER: '/user',
                USER:{
                    GET: '/user/'
                },
                GUESS:{
                    LOCK: '/guess/lock/'
                },
                USER_PARTICIPATION: {
                    PPLEAGUES:  '/userParticipation/p-leagues',
                    PPCUPS:  '/userParticipation/p-cups'
                },
                PPLEAGUE: {
                    GET: '/p-league/',
                    AVAILABLE: '/p-league/available'
                },
                PPCUP: {
                    GET: '/p-cup/',
                    AVAILABLE: '/p-cup/available',
                    GROUP: {
                        GET: '/p-cupGroup/'
                    }
                },
                PPTOURNAMENTTYPE: {
                    JOIN: '/p-tournamentType/join/'
                },
            }
        }
    }
});