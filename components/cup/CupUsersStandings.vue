<template>
    <v-card :flat="flat" :class="flat ? 'white--text' : 'white--text rounded-xl'" >
        <v-row no-gutters v-for="i in size" :key="i" 
            justify="space-between" align="center"  
            :class="colorForPosition(i)"
        >
            <template v-if="userParticipations && userParticipations.length >= i">
                <v-col>
                    <nuxt-link class="no-decoration" :to="ROUTES.USER.DETAIL + userParticipations[i-1].username">
                        <h1 class="white--text">{{userParticipations[i-1].username}}</h1>
                    </nuxt-link>
                </v-col>
                <v-col class="text-right mr-2" >
                    <v-row justify="end" align="end">
                        <h1>{{userParticipations[i-1].score}}</h1>
                        <div v-if="level && level !== 1" class="caption ml-2 mb-2">{{userParticipations[i-1].pcPointsUntilLevel}}</div>
                    </v-row>
                </v-col>
            </template>
            <template v-else><h1>?</h1></template>
        </v-row>
    </v-card>
</template>
<script>
export default {
    name: "CupUsersStandings",
    props: {
        userParticipations: {type: Array},
        flat: {type: Boolean},
        pointsToPassThird: {type: Number},
        size: {type: Number},
        level: {type: Number}
    },
    methods:{
        colorForPosition(i){
            let classes = "px-4" ;
            if(i === 1){classes += " pt-1"}
            if(i === this.size){classes += " pb-1"}
            if(this.currentUser && this.userParticipations?.length >= i && this.currentUser.id === this.userParticipations[i-1].id){
                classes += " yellow--text"
            }
            if(i-1 < (this.size / 2)){
                classes += " primary"
            }
            else if(i === 3 && this.pointsToPassThird && this.userParticipations?.length >= i && this.userParticipations[i-1].score >= this.pointsToPassThird){
                classes += " deep-purple darken-3"
            }else{
                classes += " primary_red"
            }
            return classes;
        }
    }
}
</script>