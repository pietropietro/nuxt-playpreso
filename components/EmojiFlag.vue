<template>
    <em-emoji v-if="flagEmoji" :native="flagEmoji" :size="size"/>
</template>
<script>
import { SearchIndex } from 'emoji-mart'

export default {
    props:{
        model: {type: String},
        size: {type: String, default: '1em'}
    },
    data(){
        return{
            flagEmoji: null
        }
    },
    // watch needed for round display. otherwise flag does not change
    watch: {
        model: async function () {
            await this.searchFlag();
        }
    },  
    methods:{
        async search(val) {
            if(!val)return;
            let emojis = await SearchIndex.search(val)
            let results = emojis.map((emoji) => {
                return emoji.skins[0].native
            });
            this.flagEmoji = results[0];
        },
        async searchFlag() {
            if(!this.model)return;
            let correctedModel = this.model == 'Turkiye' ? 'turkey' : this.model;
            await this.search('flag-' + correctedModel);
            if(this.flagEmoji) return;

            const words = this.model.trim().split(/\s+/);
            // Check if the array has more than one word
            if (words.length > 1) {
                await this.search('flag-' + words[0]);
            }
            if(this.flagEmoji) return;
            
            await this.search(this.model);
        }
    },
    async mounted(){
        await this.searchFlag();
    },
}
</script>