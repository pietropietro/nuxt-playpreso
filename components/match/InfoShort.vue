<template>
    <v-container class="pa-0 lh-1">
        <v-row>
            <v-col>
                <league-detail :league="match.league" />
            </v-col>
            <v-col v-if="match.round">
                <v-chip class="mx-2" x-small outlined label>R{{match.round}}</v-chip>            
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <div  v-html="teamNameToHtml(this.match.homeTeam?.name)" />
                <div  v-html="teamNameToHtml(this.match.awayTeam?.name)" />
            </v-col>
            <v-col cols="auto" class="pl-0" v-if="match.verified_at" >
                <h4>{{match.score_home}}</h4>
                <h4>{{match.score_away}}</h4>
            </v-col>
        </v-row>
        <!-- TODO ADD LIVE -->
        <v-row v-if="showDateTime" class="overline lh-1 flex-nowrap" no-gutters>
            {{formatDate(match.date_start, withTime)}}
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        match: {type: Object, required: true},
        showDateTime: {type:Boolean, default: true},
        withTime: {type: Boolean, default: true}
    },
    methods:{
        teamNameToHtml(name) {
            // if(this.$vuetify.breakpoint.mdAndUp) return name;
            
            let limitOneWord = 18;
            if (name.length <= limitOneWord) {
                return `<h4>${name}</h4>`;
            }

            let moreWordsLimit = 9;
            const words = name.split(' ');
            let h4Text = '';
            let h6Text = '';

            for (let i = 0; i < words.length; i++) {
                const word = words[i];
                if (h4Text.length + word.length > moreWordsLimit || h6Text.length) {
                    h6Text += ` ${word}`;
                } else {
                    h4Text += ` ${word}`;
                }
            }

            return `<h4 style="display:inline">${h4Text.trim()} <h6 style="display:inline">${h6Text.trim()}</h6></h4>`;
        },
    }
}
</script>