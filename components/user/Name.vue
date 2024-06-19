<template>
    <v-row no-gutters 
        class="flex-nowrap" 
        :justify="center ? 'center' : 'start'" 
        align="center"
        v-if="user"
    >
            <v-col cols="auto" :class="current ? 'currentuser': ''">
                <nuxt-link :to="ROUTES.USER.DETAIL + user.username" class="no-decoration">
                    <h1 v-if="!small">
                        {{user.username}}
                    </h1>
                    <h3 v-else>{{user.username}}</h3>
                </nuxt-link>
            </v-col>
            <v-col cols="auto">
                <v-row no-gutters align="center">
                    <template v-if="user.trophies_count > 9">
                        <em-emoji id="star" class="ml-1 mt-1"/>
                    </template>
                    <template v-if="user.ppRanking.position == 1">
                        <em-emoji id="first_place_medal" class="ml-1 mt-1"/>
                    </template>
                    <template v-if="user.ppRanking.position == 2">
                        <em-emoji id="second_place_medal" class="ml-1 mt-1"/>
                    </template>
                    <template v-if="user.ppRanking.position == 3">
                        <em-emoji id="third_place_medal" class="ml-1 mt-1"/>
                    </template>
                </v-row>
            </v-col>
    </v-row>
    
</template>
<script>
export default {
    props:{
        user:   {type:Object},
        current: {type: Boolean},
        center: {type: Boolean},
        small:  {type: Boolean, default: false}
    },
}
</script>