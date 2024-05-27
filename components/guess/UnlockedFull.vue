<template>
    <v-container>
        <match-team-selection 
            v-if="openMatch"
            :match="openMatch"
            :selectedTeamId="selectedTeamId"
            :setSelectedTeamId="(val)=>selectedTeamId=val"
        />
        
        
        <!-- ROW 2 -->
        <!-- <v-row class="py-5 text-center" justify="center" align="center">
            <v-col>
                <div class="overline lh-1 font-weight-bold">
                    <span v-if="openMatch.league.parent">
                        <b>{{openMatch.league.parent.name}}</b>
                    </span>
                    {{openMatch.league.name}}
                </div>
            </v-col>
            <v-col v-if="openMatch.league.country">
                <v-row align="end" justify="center">
                        <emoji-flag  
                            size="30"
                            :model="openMatch.league.country"
                        />
                        <h3>{{openMatch.league.level}}</h3>
                </v-row>
            </v-col>
            <v-col>
                <div class="overline lh-1 font-weight-bold">
                    <span v-if="openMatch.round">
                        round {{openMatch.round}}
                    </span>
                </div>
            </v-col>
        </v-row> -->
        
        
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            selectedTeamId: null,
        }
    },
    mounted(){
        this.selectedTeamId = this.openMatch.homeTeam.id;
    }
}
</script>
