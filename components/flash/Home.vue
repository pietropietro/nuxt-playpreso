<template>
    <p-p-section-card title="FLASH" emojiId="zap" subtitle="instant game" v-if="next" >
        <template slot="content">
            <v-row no-gutters class="mb-4">
                <v-col>
                    <v-slide-group
                        prev-icon="<"
                        next-icon=">"
                        ref="slider"
                    >
                        <v-slide-item
                            v-for="status in availableStatus"
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

        </template>
    </p-p-section-card>
</template>

<script>
import useHomepageApi from '~/composables/useHomepageApi';
export default {
    data(){
        return {
            availableStatus : ['next','current','last'],
            selectedStatus: 'next',
            current: null,
            next: null,
            last: null,
        }
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
