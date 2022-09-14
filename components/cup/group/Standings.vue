<template>
    <v-card :flat="flat" :class="flat ? 'white--text' : 'white--text rounded-xl'" >
        <!-- not cycling through ups to give '?' slot for missing players  -->
        <user-participation-standing 
            v-for="i in participants" :key="i"
            :class="colorForPosition(i)"
            :up="userParticipations.length >= i ? userParticipations[i-1] : null"
            whiteText
        />
    </v-card>
</template>
<script>
export default {
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
            else if(i === 3 && this.pointsToPassThird && this.userParticipations?.length >= i && this.userParticipations[i-1].points >= this.pointsToPassThird){
                classes += " deep-purple darken-3"
            }else{
                classes += " primary_red"
            }
            return classes;
        }
    }
}
</script>