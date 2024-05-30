<template>
    <v-row align="center">
        <h4 class="ml-4">
            {{formatDate(openMatch?.date_start,true)}}
        </h4>
        <v-spacer />
        <div class="ocrastd mr-4" @click="closeGuess">
            <h2>X</h2>
        </div>
    </v-row>
</template>

<script>
export default {
   methods:{
        async closeGuess(){
            this.$store.dispatch(
                'openGuess/update', 
                {}
            );
        }
   }
}
</script>
