<template>
    <v-row no-gutters class="pt-6 pb-3" v-if="info">
        <v-col>
            <v-slide-group
                ref="slider"
            >
                <v-slide-item
                    class="mx-2"
                >
                    <div>
                        <v-chip
                            disabled
                            :color="'primary'"
                            :value="'points'"
                            @click="selected = 'points'"
                            style="min-width:50px; opacity: 1 !important"
                        >
                            <h2>{{currentUser.points.toString()}} 🅿️</h2>
                        </v-chip>
                        <div v-if="showText" class="mt-2 overline lh-1 text-center">points</div>
                    </div>
                </v-slide-item>
                <v-slide-item
                    class="mx-2"
                >
                    <div>
                        <v-chip
                            disabled
                            :color="'primary'"
                            :value="'points'"
                            @click="selected = 'points'"
                            style="min-width:50px; opacity: 1 !important"
                        >
                            <h2>{{info.ppRanking}}° 👑</h2>
                        </v-chip>
                        <div v-if="showText" class="mt-2 overline lh-1 text-center">ranking</div>
                    </div>

                </v-slide-item>
                <v-slide-item
                    class="mx-2"
                >
                    <div>
                        <v-chip
                            disabled
                            :color="'primary'"
                            :value="'points'"
                            @click="selected = 'points'"
                            style="min-width:50px; opacity: 1 !important"
                        >
                            <h2>{{ info.trophies.length }} 🏆</h2>
                        </v-chip>
                        <div v-if="showText" class="mt-2 overline lh-1 text-center">trophies</div>
                    </div>

                </v-slide-item>
                <v-slide-item
                    class="mx-2"
                >
                    <div>
                        <v-chip
                            disabled
                            :color="'primary'"
                            :value="'points'"
                            @click="selected = 'points'"
                            style="min-width:50px; opacity: 1 !important"
                        >
                            <h2>{{info.avg}} 🎯</h2>
                        </v-chip>
                        <div v-if="showText" class="mt-2 overline lh-1 text-center">30-day avg</div>
                    </div>
                </v-slide-item>
            </v-slide-group>
        </v-col>
    </v-row>
</template>

<script>
import useHomepageApi from '~/composables/useHomepageApi';

export default {
    data() { 
        return{
            showText: true,
            info: null
        }
    },
    methods:{
        async getMainInfo(){
            let response = await this.$api.call(this.API_ROUTES.STATS.MAIN_INFO);
            if(response && response.status === "success"){
                this.info = response.message;
            }
        },
    },

    async mounted(){
        const { fetchData } = useHomepageApi(this.$store, 'main_info', this.getMainInfo);
        await fetchData();
    },
}
</script>