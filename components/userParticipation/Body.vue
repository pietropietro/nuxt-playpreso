<template>
    <v-row class="rounded-lg"
        align="center"
        :style="'background-color: ' + ppRGBA(participation.ppTournamentType.rgb, 0.8)"
    >
        <!-- <v-col cols="auto" class="pr-2">
            <em-emoji v-if="participation.ppTournamentType.emoji" 
                :native="participation.ppTournamentType.emoji" 
                size="2rem"
            />
        </v-col> -->
        <v-col class="py-1">
            <v-chip label  class="" :color="ppRGBA(participation.ppTournamentType.rgb)">
                <h1>{{ participation.ppTournamentType.emoji }}</h1>
            </v-chip>
            <h2>
                {{ppTournamentTypeTitle(participation.ppTournamentType)}}
            </h2>
        </v-col>
        <v-col class="py-1" cols="auto">
            <template v-if="!participation.started"  >
                <v-row no-gutters justify="end" class="text-overline lh-1">
                    - {{(participation.ppTournamentType.participants - participation.user_count)}} users
                </v-row>
                <v-row no-gutters justify="end" class="text-overline lh-1">
                    NOT STARTED
                </v-row>
            </template>
            <template v-else-if="participation.paused" >
                <v-row no-gutters justify="end" class="text-overline lh-1" v-if="participation.position">
                    POS. {{participation.position}}°/
                    {{participation.ppTournamentType.participants ??
                        participation.levelFormat.group_participants
                    }}
                </v-row>
                <v-row no-gutters class="text-overline lh-1">waiting matches</v-row>
            </template>
            <div v-else class="mr-2">
                <span class="overline">POS.</span>
                <v-row>
                    <h1>{{participation.position ? participation.position + '°' : '?'}}</h1>
                    <span class="overline" style="line-height:4rem" >/
                        {{participation.ppTournamentType.participants ??
                            participation.levelFormat.group_participants
                        }}
                    </span>
                </v-row>
            </div>
        </v-col>
    </v-row>
</template>

<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
}
</script>

<style>

</style>