<template>
    <v-container>
        <v-row align="center">
            <v-col>
                <team-logo 
                    :id="openMatch.homeTeam.id" 
                    :size="44"  
                />
                <div class="text-center" 
                    v-if="!openMatch.league.country"
                >
                    <emoji-flag :size="30"
                        style="position:absolute; margin-top: -10px; margin-right:-10px;"
                        :model="openMatch.homeTeam.country" 
                    />
                </div>
            </v-col>
            <v-col cols="6" sm="auto">
                <v-row class="rounded-lg" style="overflow:hidden">
                    <v-col>
                        <match-graphic-preview
                            :match="openMatch"
                            :rgb="openPPTournamentType.rgb"
                        />
                    </v-col>
                </v-row>
            </v-col>
            <v-col>
                <team-logo 
                    :id="openMatch.awayTeam.id" 
                    :size="44"  
                />
                <div class="text-center" 
                    v-if="!openMatch.league.country"
                >
                    <emoji-flag  :size="30"
                        style="position:absolute; margin-top: -10px;"
                        :model="openMatch.awayTeam.country"
                    />
                </div>
            </v-col>
        </v-row>
        
        <!-- ROW 2 -->
        <v-row class="py-5 text-center" justify="center" align="center">
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
                            :size="30"
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
        </v-row>
        
        <v-row class="pt-5">
           <v-col cols="auto">
               <match-team-standings-box
                    :standings="standings"
                    :rgb="openPPTournamentType.rgb"
                />
           </v-col>
           <v-col>
                <match-team-gol-count :rgb="openPPTournamentType.rgb" :standings="standings"/>
           </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data(){
        return{
            height: '90px'
        }
    },
    computed: {
        leagueName(){
            let name = "";
            if(this.openMatch.league.parent){
                name += this.openMatch.league.parent.name + ' - ';
            }
            name += this.openMatch.league.name;
            return name;
        },
        standings(){
            if(!this.homeStandings) return []
            return [this.homeStandings, this.awayStandings];
        },
        homeStandings(){
            if(!this.openMatch.league?.standings)return;
            return this.openMatch.league.standings.filter((e)=>e.id == this.openMatch.homeTeam.id)[0];
        },
        awayStandings(){
            if(!this.openMatch.league?.standings)return;
            return this.openMatch.league.standings.filter((e)=>e.id == this.openMatch.awayTeam.id)[0];
        },
    }
}
</script>
