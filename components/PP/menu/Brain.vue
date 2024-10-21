<template>
    <v-container  
        style="display: flex; flex-direction:column;  height:100%; width:100%; overflow: hidden;" 
        class="safe-area pa-5"
    >
        <v-row justify="center" class="ocrastd" style="flex-grow: 0;">
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
        <div 
            style="flex-grow: 1; display: flex; flex-direction: column;"
        >       
        <v-spacer/>
                <div
                    v-for="(m,i) in computedMenus" :key="i"
                    class="overline py-2"
                    style="flex-grow:0"
                    @click="()=>selectedMenu=selectedMenu ? null : m.key"
                >
                    {{selectedMenu == m.key ? 'x ' : ''}}<h3>{{ m.title }}</h3>
                </div>

                <div class="px-5">
                    <v-row justify="center" v-if="selectedMenu==='points'">
                        <table>
                            <tr v-for="(item,i) in pointsList" :key="i">
                                <td class="ocrastd">{{item.text}}</td>
                                <td class="px-5 caption">{{item.description}}</td>
                                <td class="overline lh-1">{{item.points}}</td>
                            </tr>
                        </table>
                    </v-row>
                    <v-row v-if="selectedMenu==='contact'" justify="center" class="overline lh-1 my-4">
                        pietro(at)playpreso.com
                    </v-row>
                    <p-p-menu-three-plus v-if="selectedMenu==='3+'" />
                    <p-p-menu-email-preferences v-if="selectedMenu==='email_reminders'" />
                    <p-p-menu-notification-preferences v-if="selectedMenu==='notification_settings'" />
                    <div v-if="selectedMenu==='terms'"
                        class="caption lh-1 pb-5"
                        style="white-space: pre-wrap; "
                    >
                        <div >{{ termsContent }}</div>
                    </div>
                    <p-p-menu-delete-account v-if="selectedMenu==='account_deletion'" :cancel="()=>selectedMenu=null"/>
                </div>

        <v-spacer/>
    </div>


        <div style="flex-grow: 0;" class="mb-5">
            <loading-page v-if="loadingLogout" :size="20" />
            <v-row v-else justify="center" @click="doLogout">
                <h1 class="ocrastd">LOGOUT</h1>
            </v-row>
            <!-- <v-row justify="center" class="overline lh-1">barona, milano</v-row> -->
            <v-row justify="center"><div class="overline lh-1">v{{$config.VERSION}}</div></v-row>
        </div>

    </v-container>
</template>

<script>
import { Capacitor } from '@capacitor/core';
export default {
    computed:{
        computedMenus(){
            if(!this.selectedMenu) return this.menus;
            return this.menus.filter((m)=>m.key === this.selectedMenu);
        }
    },
    data(){
        return{
            loadingLogout: false,
            selectedMenu: null,
            menus:[
                // {title: '<h3 class="ocrastd">THEME</h3>', key:'theme'},
                ...(Capacitor.isNativePlatform() 
                ? [{ title: 'NOTIFICATIONS 🔔', key: 'notification_settings' }] 
                : []), // Conditionally include the notifications menu
                {title: 'EMAIL 🔔', key:'email_reminders'},
                {title: '3+', key:'3+'},
                {title: 'POINTS 🅿️', key:'points'},
                {title: 'CONTACT', key:'contact'},
                {title: 'TERMS', key:'terms'},
                {title: 'DELETE ACCOUNT', key:'account_deletion'},
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
        data:()=>({termsContent:null}),
        async doLogout(){
            this.loadingLogout=true;
            await this.$logout.logout();
            this.$store.dispatch('menu/updateMenu', { newVal: false });
            this.loadingLogout=false;
        },
        async loadTerms() {
			try {
				const response = await fetch('/terms.txt'); // Fetches the terms.txt file from static
				this.termsContent = await response.text(); // Stores the content in termsContent
			} catch (error) {
				console.error('Error loading terms:', error);
				this.termsContent = 'Could not load terms at this time.';
			}
		}
    }, 
    async mounted(){
        this.$store.dispatch(
            'navigation/updateTitle', 
            {
                newTitle: 'menu',
                newEmoji: null,
                newOverline: null
            }        
        );
        await this.loadTerms();
    }
}
</script>
