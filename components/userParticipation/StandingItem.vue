<template>
    <v-row no-gutters justify="space-between" align="center">
        <v-col>
            <v-row no-gutters align="center">
                <span class="text-overline pr-2" v-if="up.ppLeague_id && up.position">
                    #{{up.position}}
                </span>
                <!-- <nuxt-link class="no-decoration" :to="ROUTES.USER.DETAIL + up.username"> -->
                    <div :class="'user-font ' + (up.user_id === currentUser.id ? ' currentuser': '')" 
                        :style="'--currentuser-color-var: '+ color"
                    >
                        {{up.username}}
                    </div>
                <!-- </nuxt-link> -->
            </v-row>
        </v-col>
        <v-col cols="auto" class="text-right">
            <v-row no-gutters justify="center" align="end">
                <v-col>
                    <h1>{{up.tot_points}}</h1>
                </v-col>
                <v-col v-if="up.tot_cup_points" class="ml-2" style="line-height:2.3rem">
                    <h4>
                        {{up.tot_cup_points}}
                    </h4>
                </v-col>
                <v-col v-if="showDetails" cols="auto" class="overline ml-2"  style="line-height:2.2rem">
                    {{up.tot_locked ?? 0}}-{{up.tot_preso ?? 0}}-{{up.tot_unox2 ?? 0}}
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        color: {type: String},
        up: {type: Object},
        showDetails: {type: Boolean}
    },
}
</script>
<style>
    .user-font{
        font-size: 32px !important;
        font-weight: bold;
    }
</style>