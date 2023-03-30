<template>
    <div>
        <v-row justify="center" align="center">
            <v-col>
                <div style="min-width:250px; max-width:300px;">
                    <guess-single-card
                        :match="motd.match"
                        :guess="motd.guess"
                        :afterLock="afterLock"
                        :rgb="motdPPTT.rgb"
                    />
                </div>
            </v-col>
            <v-col class="text-center">
                <h1>{{motd.aggr_count}}</h1>
                <div class="overline lh-1">locks</div>
            </v-col>
        </v-row>
        <v-row v-if="motd.stats" class="text-center">
            <v-col cols="4">
                <h3>{{motd.stats.most_locked.result}}</h3>
                <div class="overline lh-1">most <em-emoji id="lock"/></div>
            </v-col>
            <v-col cols="4">
                <h3>{{motd.stats.preso_count}}</h3>
                <div class="overline lh-1">PRESO</div>

            </v-col>
            <v-col cols="4">
                <h3>{{motd.stats.points_avg}}</h3>
                <div class="overline lh-1">AVG</div>

            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:{
        motd: {type: Object},
        motdPPTT: {type: Object}
    },
    methods:{
        afterLock(lockedGuess){
            this.motd.guess=lockedGuess;
            this.motd.aggr_count ++;
        }
    },
}
</script>