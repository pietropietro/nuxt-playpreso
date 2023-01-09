<template>
    <span>{{flagEmoji}}</span>
</template>
<script>
import data from '@emoji-mart/data'
import { init, SearchIndex } from 'emoji-mart'
init({ data })

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