<template>
    <em-emoji v-if="flagEmoji" :native="flagEmoji" :size="size"/>
</template>
<script>
import { SearchIndex } from 'emoji-mart'

export default {
    props:{
        model: {type: String, required: true},
        size: {type: String, default: '1em'}
    },
    data(){
        return{
            flagEmoji: null
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
            await this.search('flag-' + this.model);
            if(this.flagEmoji) return;
            await this.search(this.model);
        }
    },
    async mounted(){
        await this.searchFlag();
    },
}
</script>