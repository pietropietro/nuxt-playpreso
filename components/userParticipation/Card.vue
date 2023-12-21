<template>
    <v-container>
        <user-participation-body :participation="participation"/>
        <v-row v-if="participation.started">
            <v-col>
                <template v-if="participation.nextMatch">
                    <v-row >
                        <v-col cols="auto">
                            <div class="overline lh-1">next<br>match</div>
                        </v-col>
                        <v-col>
                            <match-info-short :match="participation.nextMatch" />
                        </v-col>
                    </v-row>
                </template>
            </v-col>
            <v-col cols="auto">
                <p-p-round-row-recap 
                    :currentRound="participation.currentRound" :rounds="participation.rounds"
                    :playedInCurrentRound="participation.playedInCurrentRound"
                />
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        participation: {type: Object, required: true}
    },
}
</script>
