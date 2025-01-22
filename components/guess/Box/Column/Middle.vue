<template>
    <div>
        <v-row  v-for="i in 2" :key="i"
            align="center"
            :style="{
                height: size +'px',
                maxWidth: maxWidth + 'px'
            }"
        >
            <v-col class="pa-0" style="height:100%;">
                <template v-if="i==1">
                    <guess-box-team-row 
                        v-for="j in 2" :key="j"
                        :j="j"
                        :match="match"
                        :style="'maxWidth:' + maxWidth + 'px;'" 
                        :shades="shades"
                    />
                </template>
                <template v-if="i==2" >
                    <v-row align="center" no-gutters style="height:100%">
                        <v-col class="pa-0"
                            :cols="isValidDatetime(match.verified_at) ? '9' : '12'"
                            :style="{background: shades[1], height: '100%'}"
                        >
                            <v-row no-gutters style="height:50%" align="center" justify="center" class="text-center">
                                <v-col cols="3">
                                    <emoji-flag
                                        :model="match.league.country"
                                        size="1.2em"
                                        style="line-height: 0.3em !important; margin-right:2px"
                                    />
                                    <span class="ml-n2 caption font-weight-bold">
                                        {{ match.league.level }}
                                    </span>
                                </v-col>
                                <v-col cols="9">
                                    <v-row no-gutters align="center">
                                        <v-col cols="3" v-if="match.round">
                                            <div class="overline lh-1">R{{ match.round }}</div>
                                        </v-col>
                                        <v-col cols="9">
                                            <guess-row-date-time :match="match" />
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <!-- I need style width only when there is no extra col -->
                            <league-row 
                                :style="guess.verified_at ? '' : ('maxWidth:' + maxWidth + 'px;' )" 
                                :league="match.league"
                            />
                        </v-col>
                        <v-col cols="3" v-if="isValidDatetime(match.verified_at)"
                            :style="{background: shades[0], height: '100%'}"
                        >
                            <guess-match-result :guess="guess" :match="match" />
                        </v-col>
                    </v-row>
                </template>
            </v-col>
        </v-row>
    </div>
</template>
<script>

export default {
    props:{
        guess: {type: Object, required: true},
        match: {type: Object, required: true},
        maxWidth: {type: Number},
        shades: {type: Array},
        size: {type: Number, default: 49},
    },
    methods: {
        isValidDatetime(dateString) {
            console.log('isvalidtime', this.match.homeTeam.name, dateString, this.match.verified_at);
        
            // Check if it's a non-empty string and can be parsed into a valid date
            //for motd and flash that user do not lock, verified_at holds 'toolate' or 'toopoor'
            return dateString && !isNaN(Date.parse(dateString));
        }
    }
}
</script>