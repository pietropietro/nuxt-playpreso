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
                    LOCK: '/guess/lock/'
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
            },
            ADMIN_API_ROUTES: {
                PPTOURNAMENTTYPES: '/admin/p-tournament-types',
                PPCUP:{
                    GET: '/admin/p-cup',
                    CREATE: '/admin/p-cup/'
                },
                MATCH: {
                    GET: '/admin/match',
                    VERIFY: '/admin/match/',
                    PICK: '/admin/match/pick/'
                },
                LEAGUE: {
                    GET: '/admin/league',
                    CREATE: '/admin/league',
                    UPDATE: '/admin/league/',
                    FETCH: '/admin/league/fetch/',
                } 
            }
        }
    }
});
