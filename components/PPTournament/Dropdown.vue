<template>
    <v-card flat class="transparent">
        <v-card-title 
            class="white--text pa-2 pointer" 
            :style="'background-color: ' + ppRGBA(ppTT)" 
            v-on:click="setShow"
        >
            <h2>{{ppTournamentTypeTitle(ppTT)}}</h2>
        </v-card-title>
        <v-card-text :style="'background-color: ' + ppRGBA(ppTT, 0.6)" v-show="index === activeIndex">
            <v-row class="pa-4">
                <v-col>
                    <p-p-info label="leagues"
                        :value="ppTT.leagues.length"
                    />
                </v-col>
                <v-col class="ml-5">
                    <p-p-info label="cost"
                        :value="ppTT.cost"
                    />
                </v-col>
            </v-row>
            <v-row no-gutters justify="center">
                <v-btn text @click="join" :loading="joinLoading">
                    <h1>JOIN</h1>
                    
                </v-btn>
            </v-row>
        </v-card-text>
    </v-card>
</template>
<script>
export default {
    props: {
        ppTT: {type: Object, required: true},
        index: {type: Number},
        activeIndex: {type: Number},
        setShow: {type: Function, required: true},
        onError: {type: Function, required: true},
    },
    data(){
        return{
            joinLoading: false
        }
    },
    methods:{
        async join(){
            this.joinLoading = true;
            let response = await this.$api.call(
                this.API_ROUTES.PPTOURNAMENTTYPE.JOIN + this.ppTT.id, 
                null, 
                "POST"
            );
            if(response && response.status === "success"){
                this.$router.push(this.ROUTES.PPLEAGUE.DETAIL + response.message);
                this.joinLoading = false;
                return;
            }
            await this.onError();
        },
    }
}
</script>