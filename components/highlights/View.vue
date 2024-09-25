<template>
    <div v-if="highlights">
        <v-row  class="mx-4 ocrastd" 
            style="font-size:30px; font-weight: bold; background:linear-gradient(#e30b0b, transparent); border-radius: 10px;"  
            align="center"
        >
            <v-col>HIGHLIGHTS</v-col>
            <em-emoji style="position:absolute; left:66%" id="champagne" size="3em"/>
        </v-row>

        <v-container class="mt-2">
            <v-row no-gutters class="px-4">
                <v-col>
                    <v-slide-group
                        prev-icon="<"
                        next-icon=">"
                        ref="slider"
                    >
                        <v-slide-item
                            v-for="type in highlightTypes"
                            :key="type"
                            class="mx-2"
                            ref="slideItem"
                        >
                            <v-chip
                                class="overline lh-1"
                                small
                                :outlined="selectedType==type"
                                :color="selectedType==type ? '' : 'transparent'"
                                :value="type"
                                @click="()=>selectedType=type"
                                style="min-width:50px; opacity: 1 !important"
                            >
                                <template v-if="type == 'fullPresoRounds'">full round</template>
                                <template v-else>{{type}}</template>
                            </v-chip>
                        </v-slide-item>
                    </v-slide-group>
                </v-col>
            </v-row>
            <div v-if="selectedType=='preso'">
                <highlights-preso :presos="highlights.preso"  class="px-4 pt-6"/>
            </div>
            <div v-else-if="selectedType=='trophies'">
                <highlights-trophies :trophies="highlights.trophies" class="px-4 pt-6"/>
            </div>
            <div v-else-if="selectedType=='fullPresoRounds'">
                <highlights-full-round :ppRounds="highlights.fullPresoRounds" class="px-4 pt-6"/>
            </div>
        </v-container>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            loading: true,
            highlights: null,
            highlightTypes: ['preso', 'trophies', 'fullPresoRounds'],
            selectedType: 'preso'
        }
    },
    methods:{
        async getHighlights(){
            let response = await this.$api.call(this.API_ROUTES.HIGHLIGHTS.GET);
            if(response && response.status === "success"){
                this.highlights = response.message;
                // this.userStat = response.message?.currentUserStat;
            }
            this.loading = false;
        },
    },
    async mounted(){
        await this.getHighlights();
    }
}
</script>