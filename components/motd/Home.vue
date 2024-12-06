<template>
    <p-p-section-card title="MOTD" emojiId="jigsaw" subtitle="match of the day" v-if="motd" >
        <template slot="content">
            <v-row no-gutters justify="center" align="center" class="mx-2">
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

            <v-row justify="end" class="mt-1 mr-6">
                <nuxt-link to="/motd" class="no-decoration">
                    <v-btn outlined x-small icon>
                        <h3>+</h3>
                    </v-btn>
                </nuxt-link>
            </v-row>
        </template>
    </p-p-section-card>
</template>

<script>
import useHomepageApi from '~/composables/useHomepageApi';
export default {
    data(){
        return {
            motd: null,
            motdPPTT: null,
            motdChart: null,
            openId: null
        }
    },
    methods:{
        async getMotd(){
            let response = await this.$api.call(this.API_ROUTES.MOTD.GET);
            if(response && response.status === "success"){
                this.motd = response.message?.motd;
                this.motdPPTT = response.message?.ppTournamentType;
                this.motdChart = response.message?.motdChart;
            }
        },
        onSelect(){
            if(this.motd.guess.guessed_at || this.motd.match.verified_at) return;
            this.motd.guess.match = this.motd.match;
            this.$store.dispatch('openGuesses/update', {
                newGuess: this.motd.guess,
                newList: [this.motd.guess], 
            });
        },
    },

    async mounted(){
        const { fetchData } = useHomepageApi(this.$store, 'motd', this.getMotd);
        await fetchData();
    },

}
</script>
