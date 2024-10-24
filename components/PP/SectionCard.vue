<template>
    <div
        :class="[
            $vuetify.breakpoint.smAndUp ? 'mx-10' : 'mx-4',
            'mt-10',
            'mb-16'
        ]"
        style=" background:linear-gradient(#000042, transparent); border-radius: 10px;"
    >
        <v-row  class="mx-5 mb-2 ocrastd pt-7"
            align="center"
            style="font-size:30px; font-weight: bold; "
        >
            <v-col>
                <div class="overline lh-1">{{ subtitle }}</div>
                <div>{{title}}</div>
            </v-col>
            <em-emoji style="position:absolute; left:66%" :id="emojiId" size="3em"/>
        </v-row>
        <slot name="content" />
    </div>

</template>

<script>
export default {
    props:{
        title: {type: String},
        subtitle: {type: String},
        emojiId: {type: String}
    }
}
</script>