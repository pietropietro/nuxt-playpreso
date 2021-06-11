<template>
    <v-container v-if="currentUser && currentUser.user_id === 3">
        <nuxt-link to="/admin">back</nuxt-link>
        <h1>ADD MATCH</h1>
        <v-row class="pa-4" justify="center" align="center">
            <v-col cols="12" sm="4">
                <v-select
                    v-model="homeTeam"
                    :items="teams"
                    item-text="name"
                    item-value="id"
                    label="home team"
                />
            </v-col>
            <v-col cols="12" sm="4">
                <v-select
                    v-model="awayTeam"
                    :items="teams"
                    item-text="name"
                    item-value="id"
                    label="away team"
                />
            </v-col>
            <v-col cols="12" sm="4">
                <v-select
                    v-model="round"
                    :items="rounds"
                    label="round"
                />
            </v-col>
            <v-col cols="12" sm="6">
                <v-date-picker
                    v-model="dateModel"
                    label="data"
                />
            </v-col>
            <v-col cols="12" sm="6">
                <v-time-picker
                    v-model="timeModel"
                    label="ora"
                />
            </v-col>
        </v-row>
        <v-btn @click="add" :disabled="!dateModel || !timeModel || !homeTeam || !awayTeam || !round"
            :loading="loading" class="my-10 py-10" block color="primary">
            <h1>ADD</h1>
        </v-btn>
        <v-simple-table v-if="euroMatches">
            <tbody>
                <tr v-for="(match,i) in euroMatches" :key="i">
                    {{match}}
                </tr>
            </tbody>
        </v-simple-table>
    </v-container>
</template>
<script>
export default {
    data(){
        return{
            homeTeam: null,
            awayTeam: null,
            round: null,
            dateModel: null,
            euroMatches: null,
            timeModel: null,
            loading:false,
            rounds: [
                {text: "gironi", value: "1"},
                {text: "ottavi", value: "2"},
                {text: "quarti", value: "3"},
                {text: "semifinale", value: "4"},
                {text: "finale", value: "5"}
            ],
            teams:[
                {name:"Austria",id:"1389"},
                {name:"Belgium",id:"975"},
                {name:"Croatia",id:"328"},
                {name:"Czech Republic",id:"320"},
                {name:"Denmark",id:"322"},
                {name:"England",id:"330"},
                {name:"Finland",id:"4444"},
                {name:"France",id:"329"},
                {name:"Germany",id:"323"},
                {name:"Hungary",id:"1390"},
                {name:"Italy",id:"326"},
                {name:"Netherlands",id:"321"},
                {name:"North Macedonia",id:"4445"},
                {name:"Portugal",id:"324"},
                {name:"Poland",id:"317"},
                {name:"Russia",id:"319"},
                {name:"Switzerland",id:"966"},
                {name:"Scotland",id:"4446"},
                {name:"Spain",id:"325"},
                {name:"Sweden",id:"332"},
                {name:"Slovakia",id:"1386"},
                {name:"Turkey",id:"1388"},
                {name:"Ukraine",id:"331"},
                {name:"Wales",id:"1385"},
            ]
        }
    },
    methods:{
        async add(){
            this.loading = true;
            let values = [
                {'action' : "addMatch"},
                {'HomeTeam_Id' : this.homeTeam},
                {'AwayTeam_Id' : this.awayTeam},
                {"HomeTeam" : this.teams.filter(t=> t.id === this.homeTeam)[0].name},
                {"AwayTeam" : this.teams.filter(t=> t.id === this.awayTeam)[0].name},
                {"Round": this.round},
                {'League': "Euro 21"},
                {"dateTimeInput": this.dateModel + " " + this.timeModel},
                // workaround
                {"Id":  Math.floor(Math.random() * (100000) + 400000)}
            ]
            this.euroMatches = await this.$api.call(values);
            this.homeTeam= this.awayTeam = this.round = this.timeModel = this.dateModel = null;
            this.loading = false;
        }
    },
    async mounted(){
        // let values = [
        //     {'action' : "getEuroMatches"},
        // ]
        // this.euroMatches = await this.$api.call(values);
    }
}
</script>