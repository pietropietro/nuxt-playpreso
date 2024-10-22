<template>
    <div v-if="motd">
        <v-row  class="ocrastd text-center mx-4" 
            style="
                font-size:30px; 
                font-weight: bold;
                background:linear-gradient(#00695c, transparent); 
                border-radius: 10px;
            "  
            align="center"
        >
            <v-col cols="auto">MOTD</v-col>
            <em-emoji style="position:absolute; left:66%" id="jigsaw" size="3em"/>
        </v-row>

        <v-row justify="center" align="center" class="pt-4 mx-2">
            <v-spacer/>
            <v-col>
                <guess-box-view
                    :match="motd.match"
                    :guess="motd.guess"
                    :rgb="motdPPTT.rgb"
                    :onUnlockedClick="onSelect"
                    :open="openId && openId == motd.guess.id"
                    :setOpen="(val)=>openId=val"
                />
            </v-col>
            <v-spacer/>
            <template v-if="!openId">
                <v-spacer/>
                <v-col cols="auto" class="text-center px-0">
                    <h1>{{motd.tot_locks ?? 0}} </h1>
                    <div class="overline lh-1">locks</div>
                </v-col>
            </template>
            <v-spacer v-if="!openId"/>
        </v-row>

        <v-container class="mt-5 px-5">
            <motd-table :chart="motdChart.chart" :page="1" :rgb="motdPPTT.rgb"/>
        </v-container>

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
            motd: null,
            motdPPTT: null,
            motdChart: null,
            openId: null
        }
    },
    computed: {
        refreshFlag() {
            return this.$store.getters['refreshFlag/motd'];
        }
    },
    watch: {
        async refreshFlag() {
            await this.getMotd();
        }
    },
    methods:{
        async getMotd(){
            this.loading= true;
            let response = await this.$api.call(this.API_ROUTES.MOTD.GET);
            if(response && response.status === "success"){
                this.motd = response.message?.motd;
                this.motdPPTT = response.message?.ppTournamentType;
                this.motdChart = response.message?.motdChart;
            }
            this.loading = false;
        },
        async onSelect(){
            if(this.motd.guess.guessed_at || this.motd.match.verified_at) return;
            await this.triggerHapticFeedback();
            this.motd.guess.match = this.motd.match;
            this.$store.dispatch('openGuesses/update', {
                newGuess: this.motd.guess,
                newList: [this.motd.guess], 
            });
        },
    },
    async mounted(){
        this.$store.commit('homepageLoading/set', { key: 'motd', isLoading: true });
        try {
            await this.getMotd();
        } finally {
            this.$store.commit('homepageLoading/set', { key: 'motd', isLoading: false });
        }
    },
}
</script>
