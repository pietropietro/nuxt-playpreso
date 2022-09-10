<template>
    <v-row no-gutters justify="space-between" align="center">
        <template v-if="up">
                <v-col>
                    <div :class="fontSize + ' currentuser'" v-if="up.user_id === currentUser.id" >
                        {{up.username}}
                    </div>
                    <nuxt-link class="no-decoration" :to="ROUTES.USER.DETAIL + up.username" v-else>
                        <div :class="fontSize + ' ' + fontColor" >
                        {{up.username}}</div>
                    </nuxt-link>
                </v-col>
                <v-col class="text-right mr-2" >
                    <v-row justify="end" align="end">
                        <div :class="fontSize">{{up.score}}</div>
                        <div :class="fontSize" v-if="up.score_total != up.score" 
                            class="caption ml-2 mb-2">
                            {{up.score_total}}
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