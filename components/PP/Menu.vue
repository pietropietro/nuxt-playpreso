<template>
    <v-container fill-height class="pa-5">
        <v-container style='align-self:start'>
            <v-row justify="center">
                <h2>{{currentUser.username}}</h2>
            </v-row>
            <v-row justify="center">
                <div class="overline lh-1">
                    <div>member since </div>
                    <div>{{formatMonthYear(currentUser.created_at).toLowerCase()}}</div>
                </div>
            </v-row>
            <v-row justify="center">
                <div>
                    <v-switch inset
                        v-model="$vuetify.theme.dark"
                        @change="$store.commit('user/updateDarkMode', {darkMode: $vuetify.theme.dark})"
                    />
                    <div class="overline lh-1">{{$vuetify.theme.dark ? 'DARK' : 'LIGHT'}}</div>
                </div>
            </v-row>
        </v-container>
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
        </v-container>
        <v-container style='align-self:end'>
            <v-row justify="center" @click="$logout.logout()">
                <h1 class="ocrastd">LOGOUT</h1>
            </v-row>
            <v-row justify="center" class="overline lh-1">barona, milano</v-row>
            <v-row justify="center"><div class="overline lh-1">v{{VERSION}}</div></v-row>
        </v-container>
    </v-container>
</template>
<script>
export default {
    computed:{
        computedMenus(){
            if(!this.selectedMenu) return this.menus;
            // console.log("selected",m.description, this.selectedMenu);
            return this.menus.filter((m)=>m.key === this.selectedMenu);
        }
    },
    data(){
        return{
            selectedMenu: null,
            menus:[
                {title: '<h1 class="ocrastd">POINTS</h1><em-emoji id="parking"/>', key:'points'},
                {title: '<h1 class="ocrastd">CONTACT</h1>', key:'contact'},
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
    }
}
</script>