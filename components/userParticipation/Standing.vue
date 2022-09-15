<template>
    <v-row no-gutters justify="space-between" align="center">
        <template v-if="up">
            <v-col>
                <v-row no-gutters align="center">
                    <span class="text-overline pr-2" v-if="up.ppLeague_id && up.position">
                        #{{up.position}}
                    </span>
                    <nuxt-link class="no-decoration" :to="ROUTES.USER.DETAIL + up.username">
                        <div :class="fontSize + ' ' + fontColor + (up.user_id === currentUser.id ? ' currentuser': '')">
                            {{up.username}}
                        </div>
                    </nuxt-link>
                </v-row>
            </v-col>
            <v-col cols="auto" class="text-right mr-2" >
                <v-row justify="end" align="end">
                    <div :class="fontSize">{{up.points}}</div>
                    <div :class="fontSize" v-if="up.points_total != up.points" 
                        class="caption ml-2 mb-2">
                        {{up.points_total}}
                    </div>
                </v-row>
            </v-col>
        </template>
        <div :class="fontSize" v-else>?</div>
    </v-row>
</template>
<script>
export default {
    props:{
        up: {type: Object},
        whiteText: {type: Boolean},
        small: {type: Boolean}
    },
    computed:{
        fontSize() {return !this.small ? 'pp-h1' : 'pp-h5'},
        fontColor(){return this.whiteText ? 'white--text' : 'black--text'}
    }
}
</script>
<style>
    .pp-h1{
        font-size: 32px;
        font-weight: bold;
    }
    .pp-h5{
        font-size: 24px;
        font-weight: bold;
    }
</style>