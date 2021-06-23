<template>
    <v-card :flat="flat" :class="flat ? 'white--text' : 'white--text rounded-xl'" >
        <v-row v-for="i in size" :key="i" justify="space-between"  
            :class="colorForPosition(i)"
        >
            <template v-if="users && users.length >= i">
                <h1>{{users[i-1].user.username}}</h1>
                
                <h1>{{users[i-1].plPoints}}</h1>
            </template>
            <template v-else><h1>?</h1></template>
        </v-row>
    </v-card>
</template>
<script>
export default {
    name: "CupUsersStandings",
    props: {
        users: {type: Array},
        flat: {type: Boolean},
        pointsToPassThird: {type: Number},
        size: {type: Number}
    },
    methods:{
        colorForPosition(i){
            let classes = "px-4" ;
            if(this.currentUser && this.users?.length >= i && this.currentUser.user_id === this.users[i-1].user.user_id){
                classes += " yellow--text"
            }
            if(i-1 < (this.size / 2)){
                classes += " primary"
            }
            else if(i === 3 && this.pointsToPassThird && this.users?.length >= i && this.users[i-1].plPoints >= this.pointsToPassThird){
                classes += " deep-purple darken-3"
            }else{
                classes += " primary_red"
            }
            return classes;
        }
    }
}
</script>