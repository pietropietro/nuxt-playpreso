<template>
    <v-container>
        <v-row class="rounded-tl-xl rounded-tr-xl"
            :style="'height:10px; background-color: ' + color "
        />
        <v-row>
            <v-container>
                <slot></slot>
            </v-container>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        color: {type: String}
    }
}
</script>