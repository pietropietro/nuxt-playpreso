<template>
    <v-container fluid fill-height
        :style="{ background: ppRGBA(storyData.ppl_most_kind_ups[0]?.ppTournamentType.rgb, 0.8),
                overflow: 'hidden',
                whiteSpace: 'nowrap'
          }"  
    >
        <v-row class="mt-10" align="center" justify="center">
                <div class="lh-1">
                    <span class="overline">YOU JOINED </span>
                    <span style="font-size:30px !important;"><b>{{storyData.ppl_joined_tot}}</b></span>
                    <span class="overline"> P-LEAGUES</span>
                </div>
                <div class="lh-1">
                    <span class="overline">but your favorite was </span>
                    <span style="font-size:30px !important;"><b>{{storyData.ppl_most_kind_name}}</b></span>
                    <span class="overline"> ({{storyData.ppl_most_kind_tot}})</span>
                </div>
        </v-row>

        <!-- <v-row style="height:15vh; background:   blue;">
        </v-row> -->

            <v-container
                v-for="up in storyData.ppl_most_kind_ups" :key="up.id"
            >
                <div class="overline mb-1">
                    {{Intl.DateTimeFormat('en-GB', {month:'short'}).format(new Date(up.updated_at))}}
                </div>
                <user-participation-body
                    
                    :participation="up"
                />
            </v-container>

        
    </v-container>
</template>
<script>
export default {
    props:{
        storyData: {type: Object}
    },
}
</script>

<style scoped>

</style>



