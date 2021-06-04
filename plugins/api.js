import Vue from 'vue'
    Vue.mixin({
        methods:{
            async call(values, method = "POST"){
                let formdata = new FormData();
                values.map((item) => {
                    let key = Object.keys(item)[0];
                    formdata.append(key, item[key]);
                });
                let resp;
                try {
                    await fetch('http://www.playpreso.com/api.php',{
                        method: method,
                        mode: 'cors',
                        body: formdata,
                    }).then(response => {
                        return response.json()
                    }).then((data) => {
                        if(data.status && data.status == "error"){
                            this.$notifier.showError();
                        }
                        resp = data;
                        return data;
                    });
                }catch(e){
                    console.log("error", e);
                }finally{
                    return resp;
                }
            },
    
            async doLogin(username, password){
                let values = [
                    {'action' : "logIn"},
                    {'username': username},
                    {'password': password}
                ]
                let response = await this.call(values);
                if(response?.user?.username){
                    // this.$cookies.set('pp-auth', response.token, {
                    //     path: '/',
                    //     maxAge: 60 * 60 * 24 * 7,
                    //     secure: true
                    // })
                    // this.$cookies.set('pp-user', response.user.username);
                    this.$store.commit('user/updateCurrentUser', { currentUser: response.user});
                    this.$store.commit('user/updateToken', { currentUser: response.token});
                }
            }
        }
	})
