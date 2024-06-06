<template>
    <v-row
        style="background-color:var(--v-primary-darken3);"
    >      
        <v-col style="height: 50px;" >
            <div 
                class="overline lh-1 font-weight-bold"
                @click="goToTournament"
            >
                {{userParticipation.ppTournamentType.name}}
                <span v-if="userParticipation.ppTournamentType.level"><br>{{userParticipation.ppTournamentType.level}}</span>
            </div>
        </v-col>
        <v-col style="height: 50px;">
            <div class="overline lh-1">
                <v-row no-gutters justify="end" class="text-overline lh-1" v-if="userParticipation.position">
                    POSition {{userParticipation.position}}°/
                    {{userParticipation.ppTournamentType.participants ??
                        userParticipation.levelFormat.group_participants
                    }}
                </v-row>
            </div>
        </v-col>
        <v-col class="overline lh-1"  style="height: 50px;">
            <div>
                Round {{userParticipation.currentRound}}/{{userParticipation.ppTournamentType.rounds}}  
            </div>
        </v-col>
        <v-col class="overline lh-1"  style="height: 50px;">
            <div>
                Played {{userParticipation.playedInCurrentRound[0]}}/{{userParticipation.playedInCurrentRound[1]}}
            </div>
        </v-col>
    </v-row>
</template>
<script>
export default {
    props:{
        userParticipation: {type: Object}
    },
    methods:{
        goToTournament(){
            let route = this.userParticipation.ppLeague_id ? this.ROUTES.PPLEAGUE.DETAIL + this.userParticipation.ppLeague_id
                    : this.ROUTES.PPCUP.DETAIL + this.userParticipation.ppCup_id + '/' + this.userParticipation.ppCupGroup_id;
            this.$router.push(route);
            this.$store.dispatch('openGuesses/clear');
        }
    }
}
</script>