<template>
    <v-container>
        <v-row>
            <v-col><div class="overline lh-1">COLOR</div></v-col>
            <v-col>
                <div class="overline lh-1">
                    {{ ppTournamentType.rgb }}
                </div>
            </v-col>
            <v-col>
                <v-color-picker v-model="newColor" show-swatches/>
            </v-col>
            <v-col>
                <v-btn 
                    :loading="loading"
                    @click="update(
                        {'rgb': newColor.r + ',' + newColor.g + ',' + newColor.b}
                    )">
                    UPDATE COLOR
                </v-btn>
            </v-col>
        </v-row>
        <v-row align="center">
            <v-col><div class="overline lh-1">LEAGUES</div></v-col>
            <v-col v-for="league in ppTournamentType.leagues" :key="league.id">
                <league-detail :league="league" sizeClass="text-h3"/>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        ppTournamentType: {type: Object}
    },
    data(){
        return{
            newColor: {
                'r': this.ppTournamentType.rgb.split(',')[0],
                'g': this.ppTournamentType.rgb.split(',')[1],
                'b': this.ppTournamentType.rgb.split(',')[2]
            }
        }
    },
    methods:{
        async update(values){
            this.loading = true;
    
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPTOURNAMENTTYPES.UPDATE + this.ppTournamentType.id, values, 'POST'
            );     
            if(response.status=='success'){
                this.ppTournamentType.rgb = this.newColor;
            }
            this.loading = false;
        },
    }
}
</script>