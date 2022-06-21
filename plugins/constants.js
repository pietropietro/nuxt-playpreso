import Vue from 'vue'

Vue.mixin({
    data() {
        return {
            ROUTES: {
                HOME: '/',
                LOGIN: '/login',
                REGISTER: '/register',
                RECOVER: '/recover',
                PPCUPS: '/presoCups',
                PPLEAGUES: '/presoLeagues',
                PPLEAGUE:{
                    TYPE: {
                        DETAIL: '/p-league/type/'
                    },
                    DETAIL: '/p-league/'
                },
            },
            API_ROUTES: {
                LOGIN: '/login',
                REGISTER: '/user',
                USER_PARTICIPATION: {
                    PPLEAGUES:  '/userParticipation/ppLeagues'
                },
                PPLEAGUE: {
                    GET: '/ppLeague/',
                    TYPE: {
                        GET: '/ppLeagueType/',
                        AVAILABLE: '/ppLeagueType/available',
                        JOIN: '/ppLeagueType/join/'
                    }
                } 
            }
        }
    }
});