<template>
    <span>{{flagEmoji}}</span>
</template>
<script>
import { SearchIndex } from 'emoji-mart'

export default {
    props:{
        model: {type: String},
        flag: {type: Boolean}
    },
    data(){
        return{
            flagEmoji: null
        }
    },
    watch: {
        model: async function () {
            if(this.flag){
                await this.searchFlag();
                return;
            }
            await this.search(this.model);
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
        if(this.flag){
            await this.searchFlag();
            return;
        }
        await this.search(this.model);
    },
}
</script>