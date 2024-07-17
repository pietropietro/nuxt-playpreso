<template>
    <v-row no-gutters 
		align="center" 
		justify="center" 
		class="text-center overline lh-1 font-weight-bold"
		:style="{
			height: '50%',
		}"
	>
        <div  
            :ref="refstring" 
            class="px-2"
        >
            <template v-if="league.parent">
                {{ league.parent.name }} –
            </template>
            {{ league.name }}
        </div>
    </v-row>
</template>

<script>
import { ref, nextTick, onMounted } from 'vue';
import useMarquee from '~/composables/useMarquee';
const { refreshMarquee } = useMarquee();

export default {
	props: {
		league: {
			type: Object,
			required: true
		}
	},
	computed:{
		refstring(){
			return  'league' + this.league.id;
		}
	},
	mounted(){	
		nextTick(() => {
			refreshMarquee(this.$refs[this.refstring]);
		});
	}
}
</script>

