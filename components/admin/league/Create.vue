<template>
    <div >
        <h1>CREATE LEAGUE</h1>
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
                        <p-p-emoji :model="data.item" flag size="2em"/><div class="overline ml-2">{{ data.item }}</div>
                    </template>
                    <template slot="selection" slot-scope="data">
                        <p-p-emoji :model="data.item" flag size="2em"/><div class="overline ml-2">{{ data.item }}</div>
                    </template>
                </v-select>
            </v-col>
            <v-col cols="3"><v-select label="c-lvl" v-model="countryLevelModel" :items="[1,2,3,4]"/></v-col>
            <v-col cols="3">
                <v-select label="area" v-model="areaModel" :items="areaList">
                    <template slot="item" slot-scope="data">
                        <p-p-emoji :model="data.item" flag size="2em"/><div class="overline ml-2">{{ data.item }}</div>
                    </template>
                    <template slot="selection" slot-scope="data">
                        <p-p-emoji :model="data.item" flag size="2em"/><div class="overline ml-2">{{ data.item }}</div>
                    </template>
                </v-select>
            </v-col>
            <v-col cols="3"><v-select label="a-lvl" v-model="areaLevelModel" :items="[1,2,3,4]"/></v-col>
            <v-col cols="12" class="text-center">
                <v-btn text 
                    :disabled="!nameModel || !tagModel || !countryModel || !areaModel" 
                    :loading="loading" 
                    @click="create"
                >
                    CREATE
                </v-btn>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import { getNames } from 'country-list';
export default {
    props:{leagues: {type: Array}, refresh: {type:Function}},
    data:()=>({
        nameModel: null, 
        tagModel: null, 
        lsSuffixModel: null, 
        parentModel:null, 
        countryModel: null,
        countryList: getNames(),
        countryLevelModel: null,
        areaModel: null,
        areaList: ['europe', 'america', 'asia', 'africa', 'world'],
        areaLevelModel: null,
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
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.LEAGUE.CREATE, values, 'POST'
            );
            if(response && response.status === "success"){
                this.nameModel = this.tagModel = this.parentModel = this.lsSuffixModel = this.countryModel
                = this.countryLevelModel = this.areaModel = this.areaLevelModel = null;
            }
            await this.refresh();
            this.loading = false;
        }
    },
}
</script>
