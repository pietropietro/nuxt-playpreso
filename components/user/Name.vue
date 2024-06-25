<template>
    <v-row no-gutters 
        class="flex-nowrap" 
        :justify="center ? 'center' : 'start'" 
        align="center"
        v-if="user"
    >
            <v-col cols="auto" :class="current ? 'currentuser': ''">
                <nuxt-link :to="ROUTES.USER.DETAIL + user.username" class="no-decoration">
                    <h1 v-if="!small" style="display:flex">
                        <template v-if="user.ppRanking.position == 1">
                            <span class="gold--text" >{{user.username}}</span>
                        </template>
                        <template v-else-if="user.motdLeader">
                            <span class="green--text" >{{user.username.substring(0, user.username.length / 2)}}</span>
                            <span class="white--text" >{{user.username.substring(user.username.length / 2)}}</span>
                        </template>
                        <template v-else>{{ user.username }}</template>
                    </h1>
                    <h3 v-else>{{user.username}}</h3>
                </nuxt-link>
            </v-col>
            <v-col cols="auto">
                <v-row no-gutters align="center">
                    <template v-if="user.trophies_count > 9">
                        <em-emoji id="star" class="ml-1 mt-1"/>
                    </template>
                    <template v-if="user.ppRanking.position == 1">
                        <em-emoji id="crown" class="ml-1 mt-1"/>
                    </template>
                    <!-- TODO add ptt here fro dynamic emoji -->
                    <template v-if="user.motdLeader">
                        <em-emoji id="jigsaw" class="ml-1 mt-1"/>
                    </template>
                </v-row>
            </v-col>
    </v-row>
    
</template>
<script>
export default {
    props:{
        user:   {type:Object},
        current: {type: Boolean},
        center: {type: Boolean},
        small:  {type: Boolean, default: false}
    },
}
</script>
<style>
.gold--text {
    color: #FFD700;
    background-size: 200% 200%;
    animation: shine 3s linear infinite;
    font-weight: bold;
    text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }

  @keyframes shine {
    0% {
        color: #FFD700;

        text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }
    30% {
        color: #b7a644;

        text-shadow: 0 0 10px rgba(124, 110, 27, 0.5);
    }
    60% {
        text-shadow: 0 0 10px rgba(252, 246, 213, 0.5);
    }
    100% {
        color: #FFD700;

        text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
    }
  }
</style>