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
        <v-btn @click="updateMatch" color="primary" block :disabled="!home || !away" :loading="loading">SAVE</v-btn>
    </v-card>
</template>
<script>
export default {
    name: "AdminUpdateMatch",
    props:{
        match: {type: Object, required: true},
        refresh: {type: Function}
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
            let values = [];
            values.push(
                {'action':"updateMatch"},
            ); 
            values.push(
                {'HomeGoals': this.home},
            ); 
            values.push(
                {'AwayGoals': this.away},
            ); 
            values.push(
                {'Id': this.match['xml_id']},
            ); 
            values.push(
                {'Time': 'Finished'},
            ); 
            Object.keys(this.match).map(k => {
                let newObj = {};
                newObj[k] = this.match[k];
                console.log("newObj is",newObj);
                values.push(newObj);
            }); 
            console.log("values is ", values);
            let resp = await this.$api.call(values);
            
            this.home = this.away = null;
            this.loading= false;
            this.refresh();
        }
    }
}
</script>