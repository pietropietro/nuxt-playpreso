<template>
    <v-row align="end">
        <v-col cols="auto">
            <v-row class="flex-nowrap">
                <v-col cols="auto">
                    <em-emoji v-if="ppTournamentType.emoji" :native="ppTournamentType.emoji" size="2.5em"/>
                </v-col>
                <v-col>
                    <div class="overline lh-1">P-LEAGUE</div>
                    <div class="text-h2 font-weight-bold">{{ppTournamentTypeTitle(ppTournamentType)}}</div>
                </v-col>
            </v-row>
        </v-col>
        <v-col cols="12" class="pa-0" v-if="!moreInfo && !$vuetify.breakpoint.smAndUp">
            <div class="text-center overline" @click="moreInfo=true">more info</div>
        </v-col>
        <template v-else>
            <v-spacer v-if="$vuetify.breakpoint.smAndUp" />
            <v-col lg="auto" cols="6" class="mr-lg-4">
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
            <v-col cols="6" lg="auto" >
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
                <v-col cols="12" sm="6" lg="auto">
                    <v-row align="center">
                        <v-col cols="auto" >
                            <em-emoji size="2em" id="medal"/>
                        </v-col>
                        <v-col class="px-0" cols="auto">
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
            </template>
            <v-col v-if="!$vuetify.breakpoint.smAndUp" cols="12" class="pa-0">
                <div class="text-center overline" @click="moreInfo=false">less info</div>
            </v-col>
        </template>
    </v-row>
</template>
<script>
export default {
    props:{
        ppTournamentType: {type: Object}
    },
    data(){
        return{
            moreInfo: false
        }
    }
}
</script>