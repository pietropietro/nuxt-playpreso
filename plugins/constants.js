import Vue from 'vue'

Vue.mixin({
    data() {
        return {
            ROUTES: {
                HOME: '/',
                LOGIN: '/login',
                REGISTER: '/register'
            },
            API_ROUTES: {
                LOGIN: '/login',
                REGISTER: '/users'
            }
        }
    }
});