import Vue from 'vue'

export const API_ROUTES = {
    NOTIFICATIONS: {
        GET: '/notification',
        READ: '/notification/read'
    },
    EMAIL_PREFERENCES:{
        UPDATE: '/email-preferences'
    },
    PUSH_NOTIFICATIONS:{
        SAVE: '/device-token/save',
        REMOVE: '/device-token/remove'
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
        USER_CURRENT: '/guess',
        GET_FOR_TEAM: '/guess/team/',
        GET_EXTRA_DATA: '/guess/extra-data/',
        GET_FOR_LEAGUE: '/guess/league/',
        GET_FOR_USER: '/guess/user/'
    },
    USER_PARTICIPATION: {
        GET:  '/user-participation',
        PPLEAGUES:  '/user-participation/p-leagues/',
        PPCUPGROUPS:  '/user-participation/p-cup-groups/'
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
    PPRANKING:{
        GET: '/p-ranking'
    },
    PPROUND: {
        GET: '/p-round/',
        GET_FOR_UP: '/p-round/user-participation/',
    },
    PPTOURNAMENTTYPE: {
        JOIN: '/p-tournament-type/join/'
    },
    STATS:{
        BEST_USERS: '/stats/best-users',
        USER: '/stats/user/',
        LAST_PRESO: '/stats/last-preso',
        WRAPPED: '/stats/wrapped'
    },
    MOTD: {
        GET: '/motd',
        GET_CHART: '/motd/chart',
        GET_MONTH: '/motd/month',
        LOCK: '/motd/lock'
    },
    HIGHLIGHTS: {
        GET: '/highlights'
    }
};

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
            API_ROUTES: API_ROUTES,
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
                PPCUPGROUP:{
                    GET: '/admin/p-cup-group',
                },
                MATCH: {
                    GET: '/admin/match',
                    GET_MONTH: '/admin/match/month',
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
                    GET_COUNTRY: '/admin/league/countries',
                    GET_NEED_PAST_DATA: '/admin/league/need-past-data',
                    GET_NEED_FUTURE_DATA: '/admin/league/need-future-data',
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
