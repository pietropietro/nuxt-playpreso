<template>
    <p-p-section-card title="FLASH" emojiId="zap" subtitle="instant game" v-if="next" >
        <template slot="content">
            <v-row no-gutters class="mb-6">
                <v-col>
                    <v-slide-group
                        prev-icon="<"
                        next-icon=">"
                        ref="slider"
                    >
                        <v-slide-item
                            v-for="status in availableStatuses"
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

            <flash-next v-if="selectedStatus=='next'"
                :next="next"
            />

            <flash-current v-if="selectedStatus=='current'"
                :current="current"
            />

            <flash-verified v-if="selectedStatus=='last'"
                :verifiedFlash="last"
            />
            <v-row justify="end" class="mr-6">
                <nuxt-link to="/flash" class="no-decoration">
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
            allStatuses : ['next','current','last'],
            selectedStatus: 'next',
            current: null,
            next: null,
            last: null,
        }
    },
    computed:{
        availableStatuses() {
            let arr = [];
            // Loop through allStatuses and check if the corresponding data is available
            this.allStatuses.forEach(status => {
                if (this[status]) arr.push(status);
            });
            return arr;
    },
    },
    methods:{
        async getFlash(){
            let response = await this.$api.call(this.API_ROUTES.FLASH.GET);
            if(response && response.status === "success"){
                this.current = response.message?.current;
                this.next = response.message?.next;
                this.last = response.message?.last;
            }
        },
        changeStatus(newStatus){
            this.selectedStatus = newStatus;
        }
    },
    async mounted(){
        const { fetchData } = useHomepageApi(this.$store, 'flash', this.getFlash);
        await fetchData();
    },

}
</script>
