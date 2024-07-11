<template>
    <v-row 
        justify="center"
        align="center"
        class="text-center overline lh-1 font-weight-bold"
        no-gutters
        :style="{
            height:'50%', 
            background: j== 2 ? shades[0] : shades[1],
            fontSize: '14px !important'
        }"
    >
        <div :ref="'team'+ (j==1 ? match.homeTeam.id : match.awayTeam.id)" style="width:100%">
            <div>
                <!-- <emoji-flag v-if="j==1 && showCountry" :model="match.homeTeam.country" class="mr-1"/> -->
                {{ j==1 ? match.homeTeam.name : match.awayTeam.name }}
                <!-- <emoji-flag  v-if="j==2 && showCountry" :model="match.awayTeam.country" class="ml-1" /> -->
            </div>
        </div>
    </v-row>
</template>
<script>
import { ref, nextTick, onMounted } from 'vue';
import useMarquee from '~/composables/useMarquee';
const { refreshMarquee } = useMarquee();

export default {
    props:{
        j: {type: Number},
        match: {type: Object},
        shades: {type: Array},
    },
    computed:{
        showCountry(){
            return this.match.league.country != this.match.homeTeam.country;
        },  
        refstring(){
			return  'team' + (this.j==1 ? this.match.homeTeam.id : this.match.awayTeam.id);
		}
	},
	mounted(){	
        console.log('mounted')
		nextTick(() => {
			refreshMarquee(this.$refs[this.refstring]);
		});
	}
}
</script>