import Vue from 'vue'

export const API_ROUTES = {
    USER_NOTIFICATION: {
        GET_UNREAD: '/user-notification',
        READ: '/user-notification/read'
    },
    EMAIL_PREFERENCES:{
        GET: '/email-preferences',
        UPDATE: '/email-preferences'
    },
    PUSH_PREFERENCES:{
        TOGGLE: '/push-notification-preferences/toggle',
        GET: '/push-notification-preferences'
    },
    PUSH_NOTIFICATIONS:{
        SAVE: '/device-token/save',
        REMOVE: '/device-token/remove'
    },
    USER:{
        LOGIN: '/user/login',
        SIGNUP: '/user/signup',    
        GET: '/user/',
        DELETE: '/user',
        RECOVER: '/user/recover/',
        VALIDATE_TOKEN: '/user/validate-token/',
        PASSWORD_RESET: '/user/reset'
    },
    GUESS:{
        LOCK: '/guess/lock/',
        USER_CURRENT: '/guess',
        GET_FOR_TEAM: '/guess/team/',
        GET_FOR_LEAGUE: '/guess/league/',
        GET_FOR_USER: '/guess/user/'
    },
    MATCH:{
        GET_EXTRA_DATA: '/match/extra-data/',
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
        GET: '/highlights',
        PRESO: '/highlights/preso'
    },
    FLASH: {
        GET: '/flash',
        GET_LIST: '/flash/list',
        LOCK: '/flash/lock'
    },
};

Vue.mixin({
    data() {
        return {
            ROUTES: {
                LOGIN: '/login',
                SIGNUP: '/signup',
                RECOVER: '/recover',
                HOME: '/',
                NOTIFICATION: '/notification',
                HIGHLIGHTS:{
                    PRESO: '/highlights/last-preso'
                },
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
        }
    }
});
