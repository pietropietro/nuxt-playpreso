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
            <admin-select-league label="parent" :modelId="parentModel" :setModelId="(val)=>parentModel = val" />
        </v-col>
        <v-col cols="3" v-if="!parentModel || parentModel == league?.id">
            <admin-select-country :model="countryModel" :setModel="(val)=>countryModel=val" />
        </v-col>
        <v-col cols="3">
            <v-select  v-if="!parentModel || parentModel == league?.id"
                label="c-lvl" v-model="levelModel" :items="[1,2,3,4]"
            />
        </v-col>
        <v-col cols="12" class="text-center">
            <v-btn 
                outlined 
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
export default {
    props: {
        onSuccess: {type: Function, required: false},
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
        levelModel:{
            get(){
                return !!this.league ? this.league.level : this.level; 
            },
            set(val){
                if(!!this.league){
                    this.league.level = val;
                    return;
                }
                this.level = val;
            }
        },
    },
    data:()=>({
        name: null, 
        tag: null, 
        ls_suffix: null, 
        parent_id:null, 
        country: null,
        level: null,
        loading:false
    }),
    methods:{
        async create(){
            this.loading = true;
            let values = {
                "name" : this.nameModel,
                "tag" : this.tagModel,
                "ls_suffix" : this.lsSuffixModel,
                "ls_410" : false,
                "country" : this.countryModel,
                "level" : this.levelModel,
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
                = this.level = null;
            }
            if(!!this.onSuccess)await this.onSuccess();
            this.loading = false;
        }
    },

}
</script>
