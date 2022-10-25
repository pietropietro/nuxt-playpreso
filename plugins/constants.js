import Vue from 'vue'

Vue.mixin({
    data() {
        return {
            ROUTES: {
                HOME: '/',
                LOGIN: '/login',
                SIGNUP: '/signup',
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
                USER:{
                    LOGIN: '/user/login',
                    SIGNUP: '/user/signup',    
                    GET: '/user/'
                },
                GUESS:{
                    LOCK: '/guess/lock/'
                },
                USER_PARTICIPATION: {
                    PPLEAGUES:  '/user-participation/p-leagues',
                    PPCUPS:  '/user-participation/p-cups'
                },
                PPLEAGUE: {
                    GET: '/p-league/',
                    AVAILABLE: '/p-league/available'
                },
                PPCUP: {
                    GET: '/p-cup/',
                    AVAILABLE: '/p-cup/available',
                    GROUP: {
                        GET: '/p-cup-group/'
                    }
                },
                PPTOURNAMENTTYPE: {
                    JOIN: '/p-tournament-type/join/'
                },
            },
            ADMIN_FEATURES: {
                USERS: {
                    ROUTE: '/admin/users',
                    NAME: 'users'
                },
                PPCUPS: {
                    ROUTE: '/admin/p-cups',
                    NAME: 'p-cups'
                },
                MATCHES: {
                    ROUTE: '/admin/matches',
                    NAME: 'matches'
                },
            },
            ADMIN_API_ROUTES: {
                PPTOURNAMENTTYPES: '/admin/p-tournament-types',
                PPCUP:{
                    GET: '/admin/p-cup',
                    CREATE: '/admin/p-cup/'
                },
                MATCH: {
                    GET: '/admin/match',
                    VERIFY: '/admin/match/'
                } 
            }
        }
    }
});
