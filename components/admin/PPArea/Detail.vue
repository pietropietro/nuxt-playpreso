<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="objModel">
        <v-row>
            <v-col>
                <p-p-input-text placeholder="name" :value="objModel.name" :setValue="(val)=>setModel(val, 'name')"/>
            </v-col>
        </v-row>
        <!-- COUNTRIES -->
        <template>
            <v-row>
                    <div class="overline font-weight-bold lh-1 mr-2">COUNTRIES</div>
            </v-row>
            <v-row align="center">
                    <v-col>
                        <v-row no-gutters align="center">
                            <div v-for="a in ppArea?.countries" :key="a" class="ma-1">
                                <v-chip
                                    v-if="a"
                                    small
                                    :value="a"
                                    close
                                    @click:close="removeCountry(a)"
                                >
                                    {{a}}
                                    <emoji-flag  :model="a"/>
                                </v-chip>
                            </div>
                        </v-row>
                    </v-col>
                    <v-col cols="4" >
                        <admin-select-country :model="countryModel" :setModel="(val)=>countryModel=val" />
                    </v-col>
                    <v-col cols="1">
                        <v-btn text :disabled="!countryModel" @click="addCountry">
                            add
                        </v-btn>
                    </v-col>
            </v-row>
        </template>
        <!-- EXTRA LEAGUES -->
        <template>
            <v-row>
                <div class="overline font-weight-bold lh-1 mr-2">EXTRA LEAGUES</div>
            </v-row>
            <v-row align="center">
                <v-col>
                    <v-row no-gutters align="center">
                        <div v-for="t in ppArea?.extra_leagues" :key="t?.id ?? t" class="ma-1">
                            <v-chip
                                v-if="t"
                                close
                                @click:close="removeLeague(t?.id ?? t)"
                            >
                                <league-detail big :league="t" v-if="t?.id"/>
                                <span v-else>{{t}}</span>
                            </v-chip>
                        </div>
                    </v-row>
                </v-col>
                <v-col cols="4" >
                    <admin-select-league :modelId="leagueIdModel" :setModelId="(val)=>leagueIdModel=val" label="extra" />
                </v-col>
                <v-col cols="1">
                    <v-btn text :disabled="!leagueIdModel" @click="addLeague">
                        add
                    </v-btn>
                </v-col>
            </v-row>
        </template>
        <!-- leagues chips TODO -->
        <v-row class="py-4" justify="center">
            <v-btn @click="()=>{!!ppArea ? update() : create()}">{{!!ppArea ? 'UPDATE' : 'CREATE'}}</v-btn>
        </v-row>
    </v-container>
</template>
<script>
import {Picker } from 'emoji-mart'

export default {
    props:{
        ppArea: {type: Object},
        onCreate: {type: Function}
    },
    computed:{
        objModel:{
            get(){
                if(this.ppArea) return this.ppArea;
                return this.newPPTT;
            },
            set(val){
                if(this.ppArea){
                    this.ppArea=val;
                    return;
                }
                this.newPPTT = val;                
            }
        },
        
    },
    data(){
        return{
            newPPTT: {},
            loading: false,
            countryModel: null,
            leagueIdModel: null
        }
    },
    methods:{
        async create(){
            this.loading = true;
            
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPAREA.CREATE, this.objModel, 'POST'
            );     
            await this.onCreate();
            this.loading = false;
        },
        async update(){
            this.loading = true;
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPAREA.UPDATE + this.ppArea.id, this.objModel, 'POST'
            );     
            if(response && response.status === "success"){
                // this.ppArea.name = this.objModel.name;
            }
            this.loading = false;
        },
        setModel(val, key){
            let copy = JSON.parse(JSON.stringify(this.objModel));
            copy[key] = val;
            this.objModel = copy;
        },
        async removeCountry(country){
            this.loading = true;
            
            let route = this.ADMIN_API_ROUTES.PPAREA.COUNTRY + this.ppArea.id + '/' + country;
            let response = await this.$api.call(
                route, null, 'DELETE'
            );

            if(response && response.status === "success"){
                this.ppArea.countries = this.ppArea.countries.filter((e) =>
                    e !== country
                );
            }
            this.loading = false;
        },
        async addCountry(){
            this.loading = true;
            let values = { 
                "country": this.countryModel
            }
            
            let route = this.ADMIN_API_ROUTES.PPAREA.COUNTRY + this.ppArea.id ;
            let response = await this.$api.call(
                route, values, 'POST'
            );

            if(response && response.status === "success"){
                if(!this.ppArea.countries)this.ppArea.countries = [];
                this.ppArea.countries.push(this.countryModel);
                this.countryModel = null
            }
            this.loading = false;
        },
        async removeLeague(id){
            this.loading = true;
            
            let route = this.ADMIN_API_ROUTES.PPAREA.LEAGUE + this.ppArea.id + '/' + id;
            let response = await this.$api.call(
                route, null, 'DELETE'
            );

            if(response && response.status === "success"){
                this.ppArea.extra_leagues = this.ppArea.extra_leagues?.filter((league) =>
                    league.id !== id
                );
            }
            this.loading = false;
        },
        async addLeague(){
            this.loading = true;
            let values = { 
                "leagueId": this.leagueIdModel
            }
            
            let route = this.ADMIN_API_ROUTES.PPAREA.LEAGUE + this.ppArea.id ;
            let response = await this.$api.call(
                route, values, 'POST'
            );

            if(response && response.status === "success"){
                this.ppArea.extra_leagues.push(this.leagueIdModel);
                this.leagueIdModel = null
            }
            this.loading = false;
        }
    },
}
</script>