<template>
    <div
        class="mx-4 mt-10 mb-16"
        style=" background:linear-gradient(#000042, transparent); border-radius: 10px;"
    >
        <div class="pt-4 pr-4" style="display: flex; justify-content: end;" >
            <v-btn outlined class="xx-small overline" icon @click="()=>{helpToggle= !helpToggle}" v-if="helpHtml" >
                <h6>
                    {{helpToggle ? 'X' : '?'}}
                </h6>
            </v-btn>    
        </div>
        <v-row  class="mx-5 mb-2  pt-3"
            align="center"
        >
            <v-col cols="auto" class="pr-0">
                <div class="font-weight-bold overline lh-1">{{ subtitle }}</div>
                <div class="ocrastd mt-0 font-weight-bold" style="font-size:30px;">{{title}}</div>
            </v-col>
            <em-emoji style="position:absolute; left:66%" :id="emojiId" size="5em"/>
        </v-row>
        <div v-if="helpToggle" v-html="helpHtml" class="overline lh-1 px-6 pb-6"  />
        <slot name="content" />
    </div>

</template>

<script>
export default {
    props:{
        title: {type: String},
        helpHtml: {type: String},
        subtitle: {type: String},
        emojiId: {type: String}
    },
    data(){
        return {
            helpToggle: false
        }
    }
}
</script>