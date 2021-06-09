<template>
    <v-card class="pa-5">
        <v-row>
            <h3>{{match.hometeam_name}}-{{match.awayteam_name}}</h3>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field
                    type="number"
                    v-model="home"
                    label="score home"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                    type="number"
                    v-model="away"
                    label="score away"
                />
            </v-col>
        </v-row>
        <v-btn color="primary" block :disabled="!home || !away" :loading="loading">SAVE</v-btn>
    </v-card>
</template>
<script>
export default {
    name: "AdminUpdateMatch",
    props:{
        match: {type: Object, required: true}
    },
    data(){
        return {
            loading: null,
            home:null,
            away: null
        }
    },
    methods:{
        async updateMatch(){
            this.loading= true;
            this.home = this.away = null;
            this.false= true;
        }
    }
}
</script>