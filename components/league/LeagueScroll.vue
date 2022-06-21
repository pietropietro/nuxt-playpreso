<template>
    <p-p-scroll>
        <p-p-numeric-info slot="info" label="leagues" :value="leagues.length"/>
        <v-slide-item slot="slide-item" v-for="(league,index) in leagues" :key="index">
            <div>
                <v-row no-gutters>
                    <v-col cols="12">
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
                    </v-col>
                    <v-col cols="12">
                        <div class="text-overline" style="text-align:center">{{league.tag}}</div>
                    </v-col>
                </v-row>
            </div>
        </v-slide-item>
    </p-p-scroll>
</template>
<script>
export default {
    name: "LeagueScroll",
    props: {
        leagues: {type: Array, required: true}
    }
}
</script>