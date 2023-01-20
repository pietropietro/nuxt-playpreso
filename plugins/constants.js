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
                    GET: '/user/',
                    RECOVER: '/user/recover/',
                    VALIDATE_TOKEN: '/user/validate-token/',
                    PASSWORD_RESET: '/user/reset'
                },
                GUESS:{
                    LOCK: '/guess/lock/',
                    NOT_VERIFIED: '/guess/not-verified'
                },
                USER_PARTICIPATION: {
                    GET:  '/user-participation',
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
                PPROUND: {
                    GET: '/p-round/',
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
                PPLEAGUES: {
                    ROUTE: '/admin/p-leagues',
                    NAME: 'p-leagues',
                    DETAIL: {
                        ROUTE: '/admin/p-leagues/'
                    }
                },
                PPCUPS: {
                    ROUTE: '/admin/p-cups',
                    NAME: 'p-cups'
                },
                MATCHES: {
                    ROUTE: '/admin/matches',
                    NAME: 'matches'
                },
                LEAGUES: {
                    ROUTE: '/admin/leagues',
                    NAME: 'leagues'
                },
                PPTOURNAMENTTYPES: {
                    ROUTE: '/admin/p-tournament-types',
                    NAME: 'p-tournament-types'
                },
            },
            ADMIN_API_ROUTES: {
                PPTOURNAMENTTYPES:{ 
                    GET: '/admin/p-tournament-types',
                    UPDATE: '/admin/p-tournament-types/'
                },
                USER:{
                    GET: '/admin/user',
                },
                PPLEAGUE:{
                    GET: '/admin/p-league',
                },
                PPCUP:{
                    GET: '/admin/p-cup',
                    CREATE: '/admin/p-cup/'
                },
                MATCH: {
                    GET: '/admin/match',
                    DELETE: '/admin/match/',
                    VERIFY: '/admin/match/',
                    PICK: '/admin/match/pick/'
                },
                PPROUNDMATCH:{
                    SWAP: '/admin/p-round-match/swap/'
                },
                LEAGUE: {
                    GET: '/admin/league',
                    GET_NEED_DATA: '/admin/league/need-data',
                    CREATE: '/admin/league',
                    UPDATE: '/admin/league/',
                    FETCH: '/admin/league/fetch/',
                } 
            }
        }
    }
});
