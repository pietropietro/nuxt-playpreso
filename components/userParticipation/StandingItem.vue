<template>
    <v-row no-gutters justify="space-between" align="center">
        <v-col>
            <v-row no-gutters align="center">
                <span class="text-overline pr-2" v-if="up.ppLeague_id && up.position">
                    #{{up.position}}
                </span>
                <nuxt-link class="no-decoration" :to="ROUTES.USER.DETAIL + up.username">
                    <div :class="'user-font ' + fontColor + (up.user_id === currentUser.id ? ' currentuser': '')" 
                        :style="'--my-color-var:' + ppRGBA($store.state.navigation.rgb)"
                    >
                        {{up.username}}
                    </div>
                </nuxt-link>
            </v-row>
        </v-col>
        <v-col cols="auto" class="text-right mr-2" >
            <v-row no-gutters justify="center" align="end">
                <v-col>
                    <div class="user-font">{{up.tot_points}}
                        <span v-if="up.tot_cup_points && up.tot_cup_points != up.tot_points" class="caption ml-2 mb-2">
                            {{up.tot_cup_points}}
                        </span>
                    </div>
                </v-col>
                <v-col cols="auto" v-if="showDetails">
                    <v-row no-gutters class="text-overline ml-2 mb-1">
                        <v-col>{{up.tot_locked ?? 0}}-{{up.tot_preso ?? 0}}-{{up.tot_unox2 ?? 0}}</v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        up: {type: Object},
        whiteText: {type: Boolean},
        showDetails: {type: Boolean}
    },
    computed:{
        fontColor(){return this.whiteText ? 'white--text' : 'black--text'}
    }
}
</script>
<style>
    .user-font{
        font-size: 32px !important;
        font-weight: bold;
    }
</style>