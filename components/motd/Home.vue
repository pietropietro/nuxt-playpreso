<template>
    <p-p-section-card title="MOTD" emojiId="jigsaw" subtitle="match of the day" v-if="today" >
        <template slot="content">
            <v-row no-gutters class="mb-6">
                <v-col>
                    <v-slide-group
                        prev-icon="<"
                        next-icon=">"
                        ref="slider"
                    >
                        <v-slide-item
                            v-for="status in allStatuses"
                            :key="status"
                            class="mx-2"
                            ref="slideItem"
                        >
                            <v-chip
                                class="overline lh-1"
                                small
                                :outlined="selectedStatus==status"
                                :color="selectedStatus==status ? '' : 'transparent'"
                                :value="status"
                                @click="selectedStatus = status"
                                style="min-width:50px; opacity: 1 !important"
                            >
                                {{status}}
                            </v-chip>
                        </v-slide-item>
                    </v-slide-group>
                </v-col>
            </v-row>

            <p-p-r-m-blue-print v-if="selectedStatus=='today'"
                :pprm="today" :onUnlockedClick="onSelect" :onCountDownFinished="onCountDownFinished" 
            />

            <p-p-r-m-blue-print v-if="selectedStatus=='yesterday'"
                :pprm="yesterday"
            />

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
            allStatuses : ['today','yesterday'],
            selectedStatus: 'today',

            today: null,
            yesterday: null,
        }
    },
    methods:{
        async getMotd(){
            let response = await this.$api.call(this.API_ROUTES.MOTD.GET);
            if(response && response.status === "success"){
                this.today = response.message?.today;
                this.yesterday = response.message?.yesterday;
            }
        },
        onSelect(){
            if(this.today.guess.guessed_at || this.today.match.verified_at) return;
            this.today.guess.match = this.today.match;
            this.$store.dispatch('openGuesses/update', {
                newGuess: this.today.guess,
                newList: [this.today.guess], 
            });
        },
        onCountDownFinished(){
            this.$store.commit('homepageApi/setLoadingKey', {key: 'motd', isLoading: true});
        }
    },

    async mounted(){
        const { fetchData } = useHomepageApi(this.$store, 'motd', this.getMotd);
        await fetchData();
    },

}
</script>
