<template>
    <v-slide-group
        prev-icon="<"
        next-icon=">"
        id="slider"
    >
        <v-slide-item
            v-for="tab in Object.keys(selectableViews)" 
            :key="tab"
            class="mx-2"
        >
            <v-chip v-if="tab=='date'"
                class="overline lh-1"
                style="min-width:50px; opacity: 1 !important"
                small
                color="transparent"
                disabled
            > 
                <em-emoji
                    v-if="isWithinNext24Hours(currentGuess.match?.date_start)"
                    native="alarm_clock"
                    size="1.5em"
                    class="mr-2"
                />
                {{formatDate(currentGuess?.match.date_start,true)}}
            </v-chip>

            <v-chip 
                v-else
                small
                :outlined="selectedView==tab"
                :color="selectedView==tab ? '' : 'transparent'" 
                :value="tab"
                @click="setSelectedView(tab)"
                style="min-width:50px; opacity: 1 !important"
                :disabled="selectableViews[tab]==0"
            >
                <template  v-if="tab=='standings'">
                    <emoji-flag 
                        :model="currentGuess.match.league.country" 
                        size="1.5em"
                        class="mr-2"
                    />
                    <span
                        class="overline lh-1"
                        v-if="currentGuess.match.league.parent"
                    >
                        {{ currentGuess.match.league.parent.name }}&nbsp;&ndash;&nbsp;
                    
                    </span>
                    <span
                        class="overline lh-1"
                    >
                        {{ currentGuess.match.league.name }}
                    
                    </span>
                </template>
                <template  v-else-if="tab=='lastMatches'">
                    <span class="overline lh-1">last 5</span>
                </template>
                <template  v-else-if="tab=='pptt'">
                    <em-emoji 
                        :native="currentGuess.ppTournamentType.emoji"
                        size="3em"
                    />
                </template>
                
                <span class="overline lh-1" v-else>{{ tab }}</span>
            </v-chip>
        </v-slide-item>
    </v-slide-group>
</template>
<script>
export default {
    props:{
        selectedView: {type: String},
        setSelectedView: {type: Function},
        selectableViews: {type: Object}
    },
    computed:{
        viewModel:{
            get(){return this.selectedView},
            set(val){this.setSelectedView(val);}
        }
    }
}
</script>

<style>
 .chip-selection-pp  .v-slide-group__content{
  padding-bottom: 0 !important;
}

</style>