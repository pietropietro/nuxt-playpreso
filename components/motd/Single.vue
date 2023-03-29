<template>
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
</template>
<script>
export default {
    props:{
        motd: {type: Object},
        motdPPTT: {type: Object}
    },
    methods:{
        afterLock(val){
            this.guess=val;
            this.motd.aggr_count ++;
        }
    },
}
</script>