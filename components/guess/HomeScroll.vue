<template >
    <div v-if="!loading && (currentGuesses.next.length || currentGuesses.last.length)">
        <v-row no-gutters align="center" class="flex-nowrap">
                <h1>MATCHES</h1>
                <v-chip-group
                    mandatory
                    class="ml-3 h-100"
                    active-class="primary"
                    v-model="selected"
                >
                    <v-chip :disabled="!currentGuesses[s].length" small :value="s" v-for="(s,i) in list" :key="i">
                        <div class="overline lh-1">
                            {{s}}
                            <span v-if="s=='next' && currentGuesses[s].length">
                                <template v-if="currentGuesses[s].filter((g) => !g.guessed_at).length">
                                    <em-emoji id="unlock" class="mr-n1"/>
                                    {{currentGuesses[s].filter((g) => !g.guessed_at).length}}
                                </template>
                                <template v-if="currentGuesses[s].filter((g) => g.guessed_at).length">
                                    <em-emoji id="lock" class="mr-n1"/>
                                    {{currentGuesses[s].filter((g) => g.guessed_at).length}}
                                </template>
                            </span>
                        </div>
                    </v-chip>
                </v-chip-group>
        </v-row>
        <v-row class="mt-0" v-if="currentGuesses[selected].length>0">
            <v-container class="pa-0">
                <v-slide-group
                    :show-arrows="!$vuetify.breakpoint.xs"
                    prev-icon="<"
                    next-icon=">"
                >
                    <v-slide-item v-for="(guess, index) in currentGuesses[selected]" :key="guess.id" class="mx-2">
                        <!-- width is necessary for slider to work on page landing :( -->
                        <div style="min-width:250px; max-width:300px;">
                            <guess-single-card
                                :guess="guess"
                                :match="guess.match"
                                :rgb="guess.ppTournamentType?.rgb"
                            />
                        </div>
                    </v-slide-item>
                </v-slide-group>
            </v-container>
        </v-row>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                loading: true,
                list: ['next', 'last'],
                selected: 'next',
                currentGuesses: null,
            }
        },
        methods:{
            async getCurrentGuesses(){
                this.loading =  true;
                let response = await this.$api.call(this.API_ROUTES.GUESS.USER_CURRENT);
                if(response && response.status === "success"){
                    this.currentGuesses = response.message;
                }
                this.loading = false;
            },
        },
        async mounted(){
            await this.getCurrentGuesses();
        },
    }
</script>