<template>
    <v-container fill-height  class="pa-5">
        <v-app-bar 
            color="var(--v-background-base)"
            flat 
            app
            scroll-threshold="150"
            ref="appBar"
            class="pp-app-bar safe-area"
        >
            <transition name="fade">
                <v-row justify="center" class="ocrastd">
                    <v-col cols="2"> </v-col>
                    <v-col class="text-center">
                        <h1>MENU</h1>
                    </v-col>
                    <v-col cols="2">
                        <h1 @click="$store.dispatch('menu/updateMenu', { newVal: false });">
                            X
                        </h1>
                    </v-col>
                </v-row>
            </transition>
        </v-app-bar>
        <v-container>
            <v-row justify="center" 
                v-for="(m,i) in computedMenus" :key="i" 
                v-html="m.title" 
                @click="()=>selectedMenu=selectedMenu ? null : m.key" 
            />
            <v-row justify="center" v-if="selectedMenu==='points'">
                <table>
                    <tr v-for="(item,i) in pointsList" :key="i">
                        <td class="ocrastd">{{item.text}}</td>
                        <td class="px-5 caption">{{item.description}}</td>
                        <td class="overline lh-1">{{item.points}}</td>
                    </tr>
                </table>
            </v-row>
            <v-row v-if="selectedMenu==='contact'" justify="center" class="overline lh-1">
                pietro(at)playpreso.com
            </v-row>
            <p-p-menu-three-plus v-if="selectedMenu==='3+'" />
            <p-p-menu-email-preferences v-if="selectedMenu==='email_reminders'" />
            <p-p-menu-notification-preferences v-if="selectedMenu==='notification_settings'" />
        </v-container>
        <v-container style='align-self:end'>
            <v-row justify="center" @click="doLogout">
                <h1 class="ocrastd">LOGOUT</h1>
            </v-row>
            <!-- <v-row justify="center" class="overline lh-1">barona, milano</v-row> -->
            <v-row justify="center"><div class="overline lh-1">v{{VERSION}}</div></v-row>
        </v-container>
    </v-container>
</template>
<script>
export default {
    computed:{
        computedMenus(){
            if(!this.selectedMenu) return this.menus;
            return this.menus.filter((m)=>m.key === this.selectedMenu);
        }
    },
    data(){
        return{
            selectedMenu: null,
            menus:[
                // {title: '<h3 class="ocrastd">THEME</h3>', key:'theme'},
                {title: '<h3 class="ocrastd">NOTIFICATIONS 🔔</h3>', key:'notification_settings'},
                {title: '<h3 class="ocrastd">EMAIL 🔔</h3>', key:'email_reminders'},
                {title: '<h3 class="ocrastd">3+</h3>', key:'3+'},
                {title: '<h3 class="ocrastd">POINTS</h3><em-emoji id="parking"/>', key:'points'},
                {title: '<h3 class="ocrastd">CONTACT</h3>', key:'contact'},
            ],
            pointsList:[
                {
                    text: '1X2',
                    description: 'correct win/draw',
                    points: '+5',
                },
                {
                    text: 'und/ovr',
                    description: 'less/more than 2.5 gol in match',
                    points: '+2',
                },
                {
                    text: 'gol/ngl',
                    description: 'both/not both teams score in match',
                    points: '+2',
                },
                {
                    text: 'PRESO!',
                    description: 'exact result',
                    points: '+10',
                },
            ],
        }
    },
    methods:{
        doLogout(){
            this.$logout.logout();
            this.$store.dispatch('menu/updateMenu', { newVal: false });
        }
    }, 
    mounted(){
        this.$store.dispatch(
            'navigation/updateTitle', 
            {
                newTitle: 'menu',
                newEmoji: null,
                newOverline: null
            }        
        );
    }
}
</script>