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
        onCreate: {type: Function}
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
        newColorString(){
            return this.newColorObj.r + ', ' + this.newColorObj.g + ',' + this.newColorObj.b
        }
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