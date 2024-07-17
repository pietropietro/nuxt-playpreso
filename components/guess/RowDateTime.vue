<template>
    <v-row no-gutters justify="center" align="center" class="text-center overline  lh-1">
        <div :ref="'matchstart' + match.id" class="px-2">
            {{ inNextDays(new Date(match.date_start.replace(/-/g, "/"))) ? 
                formatDate(match.date_start, true) 
                : formatDate(match.date_start) 
            }}
        </div>
    </v-row>
</template>
<script>

import { ref, nextTick, onMounted } from 'vue';
import useMarquee from '~/composables/useMarquee';
const { refreshMarquee } = useMarquee();

export default {
    props:{
        match: {type: Object, required:true}
    },
    computed:{
		refstring(){
			return  'matchstart' + this.match.id;
		}
	},
	mounted(){	
		nextTick(() => {
			refreshMarquee(this.$refs[this.refstring]);
		});
	}
}
</script>