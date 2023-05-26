<template>
    <loading-page v-if="loading"/>
    <v-container v-else-if="objModel">
        <v-row>
            <v-col>
                <div class="ocrastd">
                    #{{ objModel.id }}
                </div>
            </v-col>
            <v-col>
                <p-p-input-text placeholder="name" :value="objModel.name" :setValue="(val)=>setModel(val, 'name')"/>
            </v-col>
            <v-col>
                <p-p-input-number
                    label="level" 
                    :value="objModel.level" 
                    :setValue="(val)=>setModel(parseInt(val), 'level')"
                    :enter="null"
                />
            </v-col>
        </v-row>
        <v-row>
            <p-p-input-number
                label="cost" 
                :value="objModel.cost" 
                :setValue="(val)=>setModel(parseInt(val), 'cost')"
                :enter="null"
            />
            <p-p-input-number
                label="rounds" 
                :value="objModel.rounds" 
                :setValue="(val)=>setModel(parseInt(val), 'rounds')"
                :enter="null"
            />
            <p-p-input-number
                label="participants" 
                :value="objModel.participants" 
                :setValue="(val)=>setModel(parseInt(val), 'participants')"
                :enter="null"
            />
        </v-row>
        <!-- PICK FROM -->
        <template>
            <v-row class="mt-10">
                <div class="overline lh-1">pick matches from</div>
            </v-row>
            <v-row class="mb-10" align="center">
                <v-col>
                    <v-select
                        v-model="pickComputedModel"
                        :items="['tournament_id', 'country', 'ppArea_id']"
                    />
                </v-col>
                <v-col>
                    <template v-if="pickComputedModel === 'country' ">
                        <admin-select-country
                            :model="objModel.pick_country"
                            :setModel="(val)=>setModel(val, 'pick_country')"
                        />
                    </template>
                    <template v-else-if="pickComputedModel === 'tournament_id' ">
                        <admin-select-tournament
                            :modelId="objModel.pick_tournament"
                            :setModelId="(val)=>setModel(parseInt(val), 'pick_tournament')"
                        />
                    </template>
                    <template v-else-if="pickComputedModel === 'ppArea_id' ">
                       <admin-select-p-p-area
                            :modelId="objModel.pick_area"
                            :setModelId="(val)=>setModel(parseInt(val), 'pick_area')"
                        />
                    </template>
                </v-col>
            </v-row>
        </template>
        <!-- END PICK FROM -->
        <v-row>
            <v-col>
                <v-row>
                    <div class="overline lh-1">EMOJI</div>
                </v-row>
                <v-row>
                    <v-col>
                        <em-emoji v-if="objModel.emoji" size="5em" :native="objModel.emoji"></em-emoji>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col><div :id="'picker' + objModel.id"> </div></v-col>
                </v-row>
            </v-col>
            <v-col>
                <v-row>
                    <v-col>
                        <div class="overline lh-1">COLOR</div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-sheet width="20" height="20" 
                            :color="ppRGBA(newColorString)" 
                            rounded
                        />
                    </v-col>
                    <v-col>
                        <div class="overline lh-1">
                            {{ objModel.rgb }}
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-color-picker v-model="newColorObj" show-swatches/>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
        <v-row class="py-4" justify="center">
            <v-btn @click="()=>{!!ppTournamentType ? update() : create()}">{{!!ppTournamentType ? 'UPDATE' : 'CREATE'}}</v-btn>
        </v-row>
    </v-container>
</template>
<script>
import {Picker } from 'emoji-mart'

export default {
    props:{
        ppTournamentType: {type: Object},
        onCreate: {type: Function},
    },
    data(){
        return{
            newPPTT: {},
            loading: false,
            newColorObj: {
                'r': this.ppTournamentType?.rgb?.split(',')[0],
                'g': this.ppTournamentType?.rgb?.split(',')[1],
                'b': this.ppTournamentType?.rgb?.split(',')[2]
            }
        }
    },
    computed:{
        objModel:{
            get(){
                if(this.ppTournamentType) return this.ppTournamentType;
                return this.newPPTT;
            },
            set(val){
                if(this.ppTournamentType){
                    this.ppTournamentType = val;
                    return;
                }
                this.newPPTT = val;                
            }
        },
        pickComputedModel:{
            get(){
                if(!!this.objModel.pick_tournament) return 'tournament_id';
                if(!!this.objModel.pick_area) return 'ppArea_id';
                if(!!this.objModel.pick_country) return 'country';
                return null
            },
            set(val){
                if(val == 'tournament_id'){
                    this.setModel(1, 'pick_tournament');
                    this.setModel(null, 'pick_area');
                    this.setModel(null, 'pick_country');
                }
                if(val == 'ppArea_id'){
                    this.setModel(null, 'pick_tournament');
                    this.setModel(1, 'pick_area');
                    this.setModel(null, 'pick_country');
                }
                if(val == 'country'){
                    this.setModel(null, 'pick_tournament');
                    this.setModel(null, 'pick_area');
                    this.setModel('a', 'pick_country');
                }
            }
        },
        newColorString(){
            return this.newColorObj.r + ', ' + this.newColorObj.g + ',' + this.newColorObj.b
        }
    },
    methods:{
        async create(){
            this.loading = true;
            
            //hardtype
            this.objModel.rgb = this.newColorString;

            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPTOURNAMENTTYPES.CREATE, this.objModel, 'POST'
            );     
            await this.onCreate();
            this.loading = false;
        },
        async update(){
            this.loading = true;
    
            //hardtype
            this.objModel.rgb = this.newColorString;

            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPTOURNAMENTTYPES.UPDATE + this.objModel.id, this.objModel, 'POST'
            );     
            this.loading = false;
        },
        selectEmoji(emObj){
            console.log(emObj);
            this.setModel(emObj.native, 'emoji');
        },
        setModel(val, key){
            let copy = JSON.parse(JSON.stringify(this.objModel));
            copy[key] = val;
            this.objModel = copy;
        }
    },
    mounted(){
        const pickerOptions = { 
            onEmojiSelect: this.selectEmoji,
            parent: document.querySelector('#picker' + this.objModel.id),
        }
        new Picker(pickerOptions);
    }
}
</script>