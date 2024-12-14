<template>
  <v-container fluid fill-height>
   
    <v-row no-gutters class="mt-8">
        <v-col cols="12">
            <div class="text-center overline">
                <!-- <span v-if="storyData.most_adjacent_ups_username != storyData.most_ups_with_username">but</span> -->
                your fierce enemy has been 
            </div>
        </v-col>
        <v-col cols="12" class="text-center">
            <h1>
                {{storyData.most_adjacent_ups_username}}
            </h1>
        </v-col>
    </v-row>
    <v-row class="my-8">
        <v-col cols="6" v-for="up in storyData.most_adjacent_ups" :key="up.id" >
            <v-row no-gutters justify="space-between" class="caption">
                <v-col><span><b>{{ppTournamentTypeTitle(up.ppTournamentType)}}</b></span></v-col>
                <v-col cols="auto">
                    <span class="text-right">
                        {{Intl.DateTimeFormat('en-GB', {month:'short'}).format(new Date(up.updated_at))}}
                    </span>
                </v-col>
            </v-row>
            <div class="text-center rounded" :style="{background: ppRGBA(up.ppTournamentType.rgb, 0.6) }">
                <v-row  no-gutters v-for="i in 2" :key="up.id + i"
                    :style="i ==1 ? {background: ppRGBA(up.ppTournamentType.rgb, 1) } : {}"
                    :class="i ==1 ? 'overline rounded-tl rounded-tr' : 'overline'"
                >
                    <template v-if="
                        (up.position < up.adjacent.position && i === 1) ||
                        (up.position > up.adjacent.position && i === 2)"
                    >
                        <v-col cols="3">{{up.position}}°</v-col>
                        <v-col cols="6">{{currentUser.username}}</v-col>
                        <v-col cols="3">{{up.tot_points}}</v-col>
                    </template>
                    <template v-else>
                        <v-col cols="3">{{up.adjacent.position}}°</v-col>
                        <v-col cols="6">{{up.adjacent.username}}</v-col>
                        <v-col cols="3">{{up.adjacent.tot_points}}</v-col>
                    </template>
                </v-row>
            </div>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
    props:{
        storyData: {type: Object}
    },
}
</script>

<style>

</style>