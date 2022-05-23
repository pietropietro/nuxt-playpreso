<template>
    <v-row>
        <v-col cols="12">
            <!-- <preso-leagues-user-active /> -->
            <v-row><h3 class="ocrastd">{{$t('ppLeague.available')}}</h3></v-row>
            <p-p-league-type-available-list/>
        </v-col>

        <!-- cups -->
    </v-row>
</template>
<script>
export default {
    name: "HomePPLeagues"
}
</script>