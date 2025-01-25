<template>
    <div
        :class="[
            $vuetify.breakpoint.smAndUp ? 'mx-10' : 'mx-4',
            'mt-10',
            'mb-16'
        ]"
        style=" background:linear-gradient(#000042, transparent); border-radius: 10px;"
    >
        <v-row  class="mx-5 mb-2  pt-7"
            align="center"
        >
            <v-col cols="auto" class="pr-0">
                <div class="font-weight-bold overline lh-1">{{ subtitle }}</div>
                <div class="ocrastd mt-0 font-weight-bold" style="font-size:30px;">{{title}}</div>
            </v-col>
            <v-col class="overline" cols="auto" v-if="helpHtml">
                <v-btn outlined x-small icon @click="()=>{helpToggle= !helpToggle}">
                    <h4>
                        {{helpToggle ? 'X' : '?'}}
                    </h4>
                </v-btn>            
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