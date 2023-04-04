<template>
    <v-row align="end" :class="$vuetify.breakpoint.mdAndUp ? 'flex-nowrap' : ''">
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
            <v-col sm="auto" cols="6">
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
            <v-col cols="6" sm="auto" class="mx-sm-4">
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
            <template v-if="ppTournamentType.top_score">
                <v-col cols="6" sm="auto">
                    <p-p-info
                        label="record"
                        :value="ppTournamentType.top_score.total_points"
                    />
                </v-col>
                <v-col cols="6" sm="auto">
                    <div>
                        <v-row justify="center">
                            <user-name
                                :user="ppTournamentType.top_score.user"
                                center
                                small
                            />
                        </v-row>
                        <v-row justify="center" class="mt-0">
                            <div class="overline">record</div>
                        </v-row>
                    </div>
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