<template>
    <v-container class="pa-0">
        <v-row no-gutters
            style="height:160px; width:100%" 
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
        }
    }
}
</script>
