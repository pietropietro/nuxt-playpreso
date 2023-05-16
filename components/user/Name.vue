<template>
    <v-row no-gutters 
        class="flex-nowrap" 
        :justify="center ? 'center' : 'start'" 
        align="center"
    >
            <v-col cols="auto" :class="current ? 'currentuser': ''">
                <h1 v-if="!small">
                    {{user.username}}
                </h1>
                <h3 v-else>{{user.username}}</h3>
            </v-col>
            <v-col cols="auto" v-if="user.trophies.length">
                <v-row no-gutters align="center">
                    <template v-if="$store.state.navigation.openUserLabelId === user.id">
                        <user-trophy 
                            v-for="trophy in user.trophies"
                            :key="trophy.id"
                            :trophy="trophy"
                        />
                    </template>
                    <template v-else>
                        <user-trophy 
                            :trophy="user.trophies[0]"
                        />
                        <v-chip class="ml-1" 
                            label small color="primary" 
                            v-if="user.trophies.length > 1"
                            @click="dothis"
                        >
                            <span class="overline lh-1 font-weight-bold">{{user.trophies.length}}</span>
                        </v-chip>
                    </template>
                </v-row>
            </v-col>
    </v-row>
    
</template>
<script>
export default {
    props:{
        user:{type:Object},
        current: {type: Boolean},
        center: {type: Boolean},
        small:{type: Boolean, default: false}
    },
    methods:{
        dothis(){
            this.$store.commit('navigation/setOpenUserLabelId', this.user.id);
        }
    }
}
</script>