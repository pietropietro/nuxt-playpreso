<template>
    <div v-if="motd">
       
        <v-row no-gutters class="ml-n3">
            <span style="font-size: 60px; font-weight: bold; line-height: 0.7em;">MATCHOFTHEDAYMATCHOFTHEDAYMATCHOFTHEDAYMATCHOFTHEDAY</span>
            <em-emoji class="mt-n3" style="position: absolute; left:10%" :id="motdPPTT.emoji" size="5em" /> 
        </v-row>
        <v-row no-gutters class="ml-n1">
            <span style="font-size: 60px; font-weight: bold; line-height: 0.7em;">OFTHEDAYMATCHOFTHEDAYMATCHOFTHEDAY</span>
        </v-row>
              
        <v-row justify="center" align="center" class="pt-8">
            <v-spacer/>
            <v-col cols="auto">
                <guess-closed-box
                    :match="motd.match"
                    :guess="motd.guess"
                    :rgb="motdPPTT.rgb"
                    :onClick="onSelect"
                    :afterLock="()=>null"
                />
            </v-col>
            <v-spacer/>
            <v-col cols="auto" class="text-center px-0">
                <h1>{{motd.aggr_count ?? 0}} </h1>
                <div class="overline lh-1">locks</div>
            </v-col>
            <v-spacer/>
        </v-row>


        <v-row justify="center" class="mt-10">
            <nuxt-link to="/motd" class="no-decoration">
                <div
                    class="text-center lh-1 overline font-weight-bold"
                >
                    show more
                </div>
            </nuxt-link>
        </v-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            motd: null,
            motdPPTT: null,
            motdLeader: null
        }
    },
    methods:{
        async getMotd(){
            let response = await this.$api.call(this.API_ROUTES.MOTD.GET);
            if(response && response.status === "success"){
                this.motd = response.message?.motd;
                this.motdPPTT = response.message?.ppTournamentType;
                this.motdLeader = response.message?.motdLeader;
            }
            this.loading = false;
        },
        async onSelect(){
            console.log('a');
            if(this.motd.guess.guessed_at || this.motd.match.verified_at) return;
            console.log('b');
            await this.triggerHapticFeedback();
            this.motd.guess.match = this.motd.match;
            this.$store.dispatch('openGuesses/update', {
                newGuess: this.motd.guess,
                newList: [this.motd.guess], 
            });
        }
    },
    async mounted(){
        await this.getMotd(); 
    }
}
</script>
