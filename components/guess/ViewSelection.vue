<template>
    <v-chip-group 
        class="text-center chip-selection-pp"
        v-model="viewModel" 
        column 
        mandatory
    >
    <!-- :cols=" selectedView==tab ? '' :  'auto'" -->

        <v-row no-gutters>
            <v-col 
                v-for="tab in ['league', 'last-5', ]" 
                :key="tab"
                cols="auto"
            >
                <v-chip 
                    small
                    :outlined="selectedView==tab"
                    :color="selectedView==tab ? '' : 'transparent'" 
                    :value="tab"
                >
                    <template  v-if="tab=='league'">
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
                    <template  v-else-if="tab=='last-5'">
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
            </v-col>
        </v-row>
    </v-chip-group>
</template>
<script>
export default {
    props:{
        selectedView: {type: String},
        setSelectedView: {type: Function}
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