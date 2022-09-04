<template>
    <v-row>
        <v-spacer/>
        <v-col>
            <v-avatar size="50">
                <v-img
                    :src="getFlag(league)"
                >
                </v-img>
            </v-avatar>
        </v-col>
        <v-spacer/>
    </v-row>
</template>
<script>
export default {
    props:{
        league: {type: Object, required: true},
    }
}
</script>