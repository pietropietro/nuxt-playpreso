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
                EMAIL_PREFERENCES:{
                    UPDATE: '/email-preferences'
                },
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
                    USER_CURRENT: '/guess'
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
                STATS:{
                    BEST_USERS: '/stats/best-users',
                    LAST_PRESO: '/stats/last-preso'
                },
                MOTD: {
                    GET: '/motd',
                    LOCK: '/motd/lock'
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
                PPAREAS: {
                    ROUTE: '/admin/p-areas',
                    NAME: 'p-areas'
                },
            },
            ADMIN_API_ROUTES: {
                PPTOURNAMENTTYPES:{ 
                    GET: '/admin/p-tournament-types',
                    CREATE: '/admin/p-tournament-types',
                    UPDATE: '/admin/p-tournament-types/'
                },
                PPAREA:{ 
                    GET: '/admin/p-area',
                    CREATE: '/admin/p-area',
                    UPDATE: '/admin/p-area/',
                    COUNTRY: '/admin/p-area/country/',
                    LEAGUE: '/admin/p-area/league/',
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
                PPROUND:{
                    CREATE: '/admin/p-round/',
                },
                PPROUNDMATCH:{
                    CREATE: '/admin/p-round-match/',
                    SWAP: '/admin/p-round-match/swap/',
                    DELETE: '/admin/p-round-match/'
                },
                LEAGUE: {
                    GET: '/admin/league',
                    GET_NEED_DATA: '/admin/league/need-data',
                    CREATE: '/admin/league',
                    UPDATE: '/admin/league/',
                    FETCH: '/admin/league/fetch/',
                },
                MOTD: {
                    SET: '/admin/motd/',
                }
            }
        }
    }
});
