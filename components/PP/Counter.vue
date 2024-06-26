<template>
    <v-container class="pa-0">
        <v-row no-gutters
            :style="{
                height: height, 
                width:'100%'
            }" 
            justify="center" align="center"
        >
            <span class="text-h2 font-weight-bold">
                {{points}} <em-emoji id="parking"/>
            </span>
        </v-row>
    </v-container>    
</template>
<script>
export default {
    props:{
        points:{
            type: Number
        },
        height: {type: String, default: '160px'}
    }
}
</script>
