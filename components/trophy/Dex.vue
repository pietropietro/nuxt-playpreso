<template>
    <v-container>
        <v-row v-for="(type,k) in ppDex" :key="k" align="center">
            <v-col cols="2">
                <div class="overline lh-1">{{ k }}</div>
            </v-col>
            <v-col class="text-center">
                <v-row align="center" class="ml-2">
                    <v-col cols="3" v-for="level in type" :key="level.pptt_id"
                       
                    >
                        <div  
                            @click="!level.up_best_position ? null : selectId(level.pptt_id)" 
                            v-if="level.pptt_id != selectedSlot"
                        >
                            <div class="overline lh-1 font-weight-bold" v-if="!level.up_best_position">–</div>
                            <div class="overline lh-1 font-weight-bold" v-else-if="level.up_best_position != 1">
                                {{ level.up_best_position }}°
                            </div>
                            <em-emoji v-else
                                size="2em"
                                class="pointer"
                                :native="level.pptt_emoji"
                            />
                        </div>
                        <div class="overline lh-1" v-else-if="level.pptt_id == selectedSlot" @click="selectId(level.pptt_id)">
                            {{ formatMonthYear(level.up_updated_at, 'short') }}
                        </div>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        ppDex: {type: Object}
    },
    data(){
        return{
            loading: true,
            selectedSlot: null
        }
    },
    methods:{
        selectId(id){
            if(this.selectedSlot == id){
                this.selectedSlot = null;
                return;
            }
            this.selectedSlot=id;
        }
    }
}
</script>