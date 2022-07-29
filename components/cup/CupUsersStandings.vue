<template>
    <v-card :flat="flat" :class="flat ? 'white--text' : 'white--text rounded-xl'" >
        <!-- not cycling through ups to give '?' slot for missing players  -->
        <v-row no-gutters v-for="i in participants" :key="i" 
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
                        <div v-if="userParticipations[i-1].score_total != userParticipations[i-1].score" 
                            class="caption ml-2 mb-2">
                            {{userParticipations[i-1].score_total}}
                        </div>
                    </v-row>
                </v-col>
            </template>
            <h1 v-else>?</h1>
        </v-row>
    </v-card>
</template>
<script>
export default {
    name: "CupUsersStandings",
    props: {
        userParticipations: {type: Array},
        flat: {type: Boolean},
        //TODO get value from server
        pointsToPassThird: {type: Number},
        participants: {type: Number},
    },
    methods:{
        colorForPosition(i){
            let classes = "px-4" ;
            if(i === 1){classes += " pt-1"}
            if(i === this.participants){classes += " pb-1"}
            if(this.currentUser && this.userParticipations?.length >= i && this.currentUser.id === this.userParticipations[i-1].id){
                classes += " yellow--text"
            }
            if(i-1 < (this.participants / 2)){
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