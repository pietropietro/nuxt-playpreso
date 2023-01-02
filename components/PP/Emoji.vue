<template>
    <span>{{flagEmoji}}</span>
</template>
<script>
import data from '@emoji-mart/data'
import { init, SearchIndex } from 'emoji-mart'
init({ data })

export default {
    props:{
        model: {type: String}
    },
    data(){
        return{
            flagEmoji: null
        }
    },

    methods:{
        async search(value) {
            if(!value)return;
            console.log("searchgin " + value);
            let emojis = await SearchIndex.search(value)
            console.log(emojis, "emojis");
            let results = emojis.map((emoji) => {
                return emoji.skins[0].native
            });

            this.flagEmoji = results[0];
        }
    },
    async mounted(){
        await this.search(this.model);
    },
}
</script>