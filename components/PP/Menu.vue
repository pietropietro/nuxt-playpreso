<template>
    <v-container fill-height class="pa-5">
        <v-container style='align-self:start'>
            <v-row justify="center">
                <h1 class="ocrastd">{{currentUser.username}}</h1>
            </v-row>
            <v-row justify="center">
                <h2 class="ocrastd">{{currentPoints}}<p-p-emoji model="blue p"/><p-p-emoji model="blue p"/></h2>
                <!-- <div class="ocrastd">
                    <h3>member since </h3>
                    <h3>{{formatMonthYear(currentUser.created_at).toLowerCase()}}</h3>
                </div> -->
            </v-row>
        <v-row justify="center">
            <div class="ocrastd">
                <h3>member since </h3>
                <h3>{{formatMonthYear(currentUser.created_at).toLowerCase()}}</h3>
            </div>
        </v-row>

        </v-container>
        <v-row justify="center">
            <h1 class="ocrastd">RULES</h1>
        </v-row>
        <v-container style='align-self:end'>
            <v-row justify="center" @click="$logout.logout()">
                <h1 class="ocrastd">LOGOUT</h1>
            </v-row>
            <v-row justify="center"><div class="overline lh-1">v{{VERSION}}</div></v-row>
        </v-container>
    </v-container>
</template>
<script>
export default {
    
}
</script>