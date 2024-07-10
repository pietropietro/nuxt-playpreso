<template>
    <v-container v-if="guess && match">   
        <v-row
            class="rounded-lg"
            :style="{
                height: size,
                minWidth: size,
                overflow: 'hidden'
            }"
        >   
            <v-col>
                <v-row>
                    <v-col cols="auto">
                        <v-row v-for="i in 2" :key="i"
                            align="center"
                            justify="center"
                            class="text-center"
                            :style="{
                                height: size +'px',
                                background: i== 2 ? ppRGBA(rgb, shade1) : ppRGBA(rgb, shade2)
                            }"
                        >
                            <v-col class="pa-0" style="min-width:49px;">
                                <team-logo v-if="i==1"
                                    :id="match.homeTeam.id"
                                    :name="match.homeTeam.name"
                                    size="30"
                                />
                                <template v-if="i==2" >
                                    <em-emoji
                                        :native="guess.ppTournamentType?.emoji"
                                        size="2em"
                                    />
                                </template>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col>
                        <guess-open-box-middle 
                            :guess="guess"
                            :match="match"
                            :rgb="rgb"
                            :size="size"
                        />
                    </v-col>
                    <v-col cols="auto">
                        <v-row v-for="i in 2" :key="i"
                            align="center"
                            justify="center"
                            class="text-center"
                            :style="{
                                height: size +'px',
                                background: i== 1 ? ppRGBA(rgb, shade1) : ppRGBA(rgb, shade2)
                            }"
                        >
                            <v-col class="pa-0" style="min-width:49px;">
                                <team-logo 
                                    v-if="i==1"
                                    :id="match.awayTeam.id"
                                    :name="match.awayTeam.name"
                                    size="30"
                                />
                                <template v-else>
                                    <div v-if="!guess.verified_at">
                                        <guess-box-time :match="match" :guess="guess"/>
                                    </div>
                                    <div class="text-center" v-else>
                                        <guess-single-view-points :guess="guess" />
                                    </div>
                                </template>
                            </v-col>
                               
                        </v-row>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    props:{
        guess: {type: Object, required: true},
        match: {type: Object, required: true},
        rgb: {type: String},
        size: {type: Number, default: 49},
        setOpen: {type: Function}
    },
    methods:{
        handleClick(){
            console.log('set open null');
            this.setOpen(null);
        }
    },
    computed:{
        shade1(){
            return this.match.verified_at ? 0.4 : 0.6;
        },
        shade2(){
            return this.match.verified_at ? 0.2 : 0.4;
        }
    }
}
</script>