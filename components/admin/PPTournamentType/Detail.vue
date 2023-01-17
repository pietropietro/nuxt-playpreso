<template>
    <v-container>
        <v-row>
            <v-col>
                <div class="ocrastd">
                    #{{ ppTournamentType.id }}
                </div>
            </v-col>
        </v-row>
        <v-row>
            <p-p-input-number
                label="cost" 
                :value="ppTournamentType.cost" 
                :setValue="(val)=>{ ppTournamentType.cost = parseInt(val)}"
                :enter="async () => await update(
                    {'cost': ppTournamentType.cost}
                )"
            />
            <p-p-input-number
                label="rounds" 
                :value="ppTournamentType.rounds" 
                :setValue="(val)=>{ ppTournamentType.rounds = parseInt(val)}"
                :enter="async () => await update(
                    {'rounds': ppTournamentType.rounds}
                )"
            />
            <p-p-input-number
                label="participants" 
                :value="ppTournamentType.participants" 
                :setValue="(val)=>{ ppTournamentType.participants = parseInt(val)}"
                :enter="async () => await update(
                    {'participants': ppTournamentType.participants}
                )"
            />
        </v-row>
        <v-container class="my-5">
            <v-row>
                <div class="overline lh-1">EMOJI</div>
            </v-row>
            <v-row>
                <v-col>
                    <em-emoji v-if="ppTournamentType.emoji" size="5em" :native="ppTournamentType.emoji"></em-emoji>
                </v-col>
                <v-col><div :id="'picker' + ppTournamentType.id"> </div></v-col>
                <v-col>
                <v-btn 
                    :loading="loadingUpdate"
                    @click="update(
                        {'emoji': ppTournamentType.emoji}
                    )">
                    UPDATE EMOJI
                </v-btn>
            </v-col>
            </v-row>
        </v-container>
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
                    :loading="loadingUpdate"
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
import {Picker } from 'emoji-mart'

export default {
    props:{
        ppTournamentType: {type: Object}
    },
    data(){
        return{
            loadingUpdate: false,
            newColor: {
                'r': this.ppTournamentType.rgb?.split(',')[0],
                'g': this.ppTournamentType.rgb?.split(',')[1],
                'b': this.ppTournamentType.rgb?.split(',')[2]
            }
        }
    },
    methods:{
        async update(values){
            this.loadingUpdate = true;
    
            let response = await this.$api.call(
                this.ADMIN_API_ROUTES.PPTOURNAMENTTYPES.UPDATE + this.ppTournamentType.id, values, 'POST'
            );     
            if(response.status=='success'){
                if(values.rgb)this.ppTournamentType.rgb = values.rgb;
            }
            this.loadingUpdate = false;
        },
        selectEmoji(emObj){
            console.log(emObj);
            this.ppTournamentType.emoji=emObj.native;
        }
    },
    mounted(){
        const pickerOptions = { 
            onEmojiSelect: this.selectEmoji,
            parent: document.querySelector('#picker' + this.ppTournamentType.id),
        }
        new Picker(pickerOptions);
    }
}
</script>