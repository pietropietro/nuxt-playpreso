<template>
    <v-card :flat="flat" :class="flat ? 'white--text' : 'white--text rounded-xl'" >
        <v-row v-for="(item,i) in users" :key="i" justify="space-between"  
            :class="colorForPosition(item,i)"
        >
            <h1 :class="currentUser && currentUser.user_id === item.user.user_id ? 'yellow--text' : ''">{{item.user.username}}</h1>
            <h1 :class="currentUser && currentUser.user_id === item.user.user_id ? 'yellow--text' : ''">{{item.plPoints}}</h1>
        </v-row>
    </v-card>
</template>
<script>
export default {
    name: "CupUsersStandings",
    props: {
        users: {type: Array},
        flat: {type: Boolean},
        pointsToPassThird: {type: Number}
    },
    methods:{
        colorForPosition(item,i){
            let classes = "px-4" ;
            if(i < (this.users.length / 2)){
                classes += " primary"
            }
            else if(i === 2 && this.pointsToPassThird && item.plPoints >= this.pointsToPassThird){
                classes += " deep-purple darken-3"
            }else{
                classes += " primary_red"
            }
            return classes;
        }
    }
}
</script>