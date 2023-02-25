<template>
    <v-row align="center" justify="center">
        <v-col cols="3">
            <p-p-input-text placeholder="name" :value="nameModel" :setValue="(val)=>nameModel=val"/>
        </v-col>
        <v-col cols="3">
            <p-p-input-text placeholder="tag" :value="tagModel" :setValue="(val)=>tagModel=val"/>
        </v-col>
        <v-col cols="3">
            <p-p-input-text placeholder="ls-suffix" :value="lsSuffixModel" :setValue="(val)=>lsSuffixModel=val"/>
        </v-col>
        <v-col cols="3">
            <v-select label="parent" v-model="parentModel" :items="leagues" item-text="name" item-value="id"/>
        </v-col>
        <v-col cols="3">
            <v-select label="country" v-model="countryModel" :items="countryList">
                <template slot="item" slot-scope="data">
                    <emoji-flag :model="data.item" size="2em"/><div class="overline ml-2">{{ data.item }}</div>
                </template>
                <template slot="selection" slot-scope="data">
                    <emoji-flag :model="data.item" size="2em"/><div class="overline ml-2">{{ data.item }}</div>
                </template>
            </v-select>
        </v-col>
        <v-col cols="3"><v-select label="c-lvl" v-model="countryLevelModel" :items="[1,2,3,4]"/></v-col>
        <v-col cols="3">
            <v-select label="area" v-model="areaModel" :items="areaList">
                <template slot="item" slot-scope="data">
                    <emoji-flag :model="data.item" size="2em"/><div class="overline ml-2">{{ data.item }}</div>
                </template>
                <template slot="selection" slot-scope="data">
                    <emoji-flag :model="data.item" size="2em"/><div class="overline ml-2">{{ data.item }}</div>
                </template>
            </v-select>
        </v-col>
        <v-col cols="3"><v-select label="a-lvl" v-model="areaLevelModel" :items="[1,2,3,4]"/></v-col>
        <v-col cols="12" class="text-center">
            <v-btn text 
                :disabled="!nameModel" 
                :loading="loading" 
                @click="create"
            >
                {{!!league ? 'UPDATE' : 'CREATE'}}
            </v-btn>
        </v-col>
    </v-row>
</template>
<script>
import { getNames,getNameList, overwrite } from 'country-list';
    overwrite([
        {
            code: 'AW',
            name: 'England'
        },
        {
            code: 'AX',
            name: 'Scotland'
        },
        {
            code: 'TR',
            name: 'Turkey'
        },
        {
            code: 'US',
            name: 'US'
        },
        {
            code: 'KR',
            name: 'South Korea'
        }
    ]);

export default {
    props: {
        leagues: {type: Array}, 
        onSuccess: {type: Function},
        league: {type: Object}
    },
    computed:{
        nameModel:{
            get(){
                return !!this.league ? this.league.name : this.name; 
            },
            set(val){
                if(!!this.league){
                    this.league.name = val;
                    return;
                }
                this.name = val;
            }
        }, 
        tagModel:{
            get(){
                return !!this.league ? this.league.tag : this.tag; 
            },
            set(val){
                if(!!this.league){
                    this.league.tag = val;
                    return;
                }
                this.tag = val;
            }
        }, 
        lsSuffixModel:{
            get(){
                return !!this.league ? this.league.ls_suffix : this.ls_suffix; 
            },
            set(val){
                if(!!this.league){
                    this.league.ls_suffix = val;
                    return;
                }
                this.ls_suffix = val;
            }
        }, 
        parentModel:{
            get(){
                return !!this.league ? this.league.parent_id : this.parent_id; 
            },
            set(val){
                if(!!this.league){
                    this.league.parent_id = val;
                    return;
                }
                this.parent_id = val;
            }
        },
        countryModel:{
            get(){
                return !!this.league ? this.league.country : this.country; 
            },
            set(val){
                if(!!this.league){
                    this.league.country = val;
                    return;
                }
                this.country = val;
            }
        },
        countryLevelModel:{
            get(){
                return !!this.league ? this.league.country_level : this.country_level; 
            },
            set(val){
                if(!!this.league){
                    this.league.country_level = val;
                    return;
                }
                this.country_level = val;
            }
        },
        areaModel:{
            get(){
                return !!this.league ? this.league.area : this.area; 
            },
            set(val){
                if(!!this.league){
                    this.league.area = val;
                    return;
                }
                this.area = val;
            }
        },
        areaLevelModel:{
            get(){
                return !!this.league ? this.league.area_level : this.area_level; 
            },
            set(val){
                if(!!this.league){
                    this.league.area_level = val;
                    return;
                }
                this.area_level = val;
            }
        },
    },
    data:()=>({
        name: null, 
        tag: null, 
        ls_suffix: null, 
        parent_id:null, 
        country: null,
        countryList: getNames(),
        country_level: null,
        area: null,
        areaList: ['europe', 'america', 'asia', 'africa', 'world'],
        area_level: null,
        loading:false
    }),
    methods:{
        async create(){
            this.loading = true;
            let values = {
                "name" : this.nameModel,
                "tag" : this.tagModel,
                "ls_suffix" : this.lsSuffixModel,
                "country" : this.countryModel,
                "country_level" : this.countryLevelModel,
                "area" : this.areaModel,
                "area_level" : this.areaLevelModel,
                "parent_id" : this.parentModel,
            };
            let route = !!this.league ? (this.ADMIN_API_ROUTES.LEAGUE.UPDATE + this.league.id) : this.ADMIN_API_ROUTES.LEAGUE.CREATE;
            let response = await this.$api.call(
                route, 
                values, 
                'POST'
            );
            if(response && response.status === "success"){
                this.name = this.tag = this.parent_id = this.ls_suffix = this.country
                = this.country_level = this.area = this.area_level = null;
            }
            if(!!this.onSuccess)await this.onSuccess();
            this.loading = false;
        }
    },
    mounted(){
        console.log(getNameList());
    }
}
</script>
