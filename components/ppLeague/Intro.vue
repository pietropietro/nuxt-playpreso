<template>
    <div>
        <v-row class="flex-nowrap my-2">
            <!-- <v-col cols="auto"> -->
                <v-spacer/>
                <em-emoji v-if="ppTournamentType.emoji" :native="ppTournamentType.emoji" size="5em"/>
                <v-spacer/>
            <!-- </v-col> -->
        </v-row>
        <v-row>
            <!-- <v-col cols="12" class="pa-0" v-if="!moreInfo && !$vuetify.breakpoint.smAndUp">
                <div class="text-center overline" @click="moreInfo=true">more info</div>
            </v-col> -->
            <template>
                <!-- <v-col cols="6" >
                    <p-p-info
                        v-if="ppTournamentType.leagues.length == 1"
                        label="league"
                        :value="ppTournamentType.leagues[0].name"
                    />
                    <p-p-info
                        v-else
                        label="leagues"
                        :value="ppTournamentType.leagues.length"
                    />
                </v-col>
                <v-col cols="6" >
                   <p-p-info
        
                        v-if="ppTournamentType.next"
                        label="qualifies to"
                        :value="ppTournamentTypeTitle(ppTournamentType.next)"
                    />
                    <p-p-info
                         v-else
                        label="level"
                        value="Last"
                    />
                </v-col>
                <template v-if="ppTournamentType.top_up">
                    <v-col cols="12" >
                        <v-row align="center">
                            <v-col cols="auto" >
                                <em-emoji size="2em" id="medal"/>
                            </v-col>
                            <v-col class="px-0" cols="auto" v-if="ppTournamentType.top_up?.updated_at">
                                <div class="overline lh-1">
                                    {{Intl.DateTimeFormat('en-GB', {month:'short'}).format(new Date(ppTournamentType.top_up.updated_at))}}
                                    <br>
                                     '{{Intl.DateTimeFormat('en-GB', {year:'2-digit'}).format(new Date(ppTournamentType.top_up.updated_at))}}
                                </div>
                            </v-col>
                            <v-col>
                                <user-participation-standing-item :up="ppTournamentType.top_up"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </template> -->
                <!-- <template v-if="ppTournamentType.userUps">
                    <v-col cols="12" 
                        v-for="up in ppTournamentType.userUps" :key="up.id"
                    >
                        <v-row align="center" v-if="up.ppLeague_id != ppLeagueId">
                            <v-col class="px-0" cols="auto" v-if="up?.updated_at">
                                <div class="overline lh-1">
                                    {{Intl.DateTimeFormat('en-GB', {month:'short'}).format(new Date(up.updated_at))}}
                                    <br>
                                     '{{Intl.DateTimeFormat('en-GB', {year:'2-digit'}).format(new Date(up.updated_at))}}
                                </div>
                            </v-col>
                            <v-col>
                                <user-participation-standing-item :up="up"/>
                            </v-col>
                        </v-row>
                    </v-col>
                </template> -->
                <!-- <v-col v-if="!$vuetify.breakpoint.smAndUp" cols="12" class="pa-0">
                    <div class="text-center overline" @click="moreInfo=false">less info</div>
                </v-col> -->
            </template>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        ppTournamentType: {type: Object},
        ppLeagueId: {type: Number}
    },
    // data(){
    //     return{
    //         moreInfo: true
    //     }
    // }
}
</script>