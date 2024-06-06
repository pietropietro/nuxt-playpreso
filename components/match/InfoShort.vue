<template>
    <v-container class="pa-0 lh-1">
        <v-row>
            <v-col>
                <league-detail :league="match.league" />
            </v-col>
            <v-col class="px-0 overline lh-1" v-if="match.round" cols="auto">
                R{{match.round}}          
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
               <div v-html="nameToCompactHtml(this.match.homeTeam?.name)" >
               </div>
                <div v-html="nameToCompactHtml(this.match.awayTeam?.name)" />
            </v-col>
            <v-col cols="auto" class="pl-0" v-if="match.verified_at" >
                <h4>{{match.score_home}}</h4>
                <h4 class="flex-nowrap">{{match.score_away}}</h4>
            </v-col>
        </v-row>
        <!-- TODO ADD LIVE -->
        <v-row v-if="showDateTime" class="overline lh-1 " no-gutters>
            <div>{{formatDate(match.date_start, showTime)}}</div>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        match: {type: Object, required: true},
        showDateTime: {type:Boolean, default: true},
        withTime: {type: Boolean, default: true}
    },
    computed:{
        showTime(){
            if(!this.withTime)return false;
            return new Date(this.match.date_start).setHours(0,0,0,0) >= new Date().setHours(0,0,0,0); 
        }
    }
}
</script>