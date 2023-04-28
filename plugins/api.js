import jwt_decode from "jwt-decode";
export default ({store, $notifier, $logout, $config: { API_ENDPOINT }},inject) => {
	inject('api', {
       
        async call(route, values, method, use_formdata = false){
            let resp;
            let myFormData;
            const noBody = ["GET" , "DELETE"];

            let includeBody = !!values && !!method && !noBody.includes(method) ? true : false;
            
            if(includeBody && use_formdata){
                myFormData = new FormData();                
                values.map((item) => {
                    let key = Object.keys(item)[0];
                    myFormData.append(key,  item[key]);
                });
            }

            
            let includeAuth = store.state.user && store.state.user.token ? true : false;
            let headers = includeAuth ? new Headers({
                'Content-Type': "application/json",
                'Authorization': store.state.user.token,
            }) : new Headers({'Content-Type': "application/json"});
            
            let initOptions = {
                method: method,
                mode: 'cors',
                credentials: 'include'
            };
            
            initOptions.headers = headers;
            
            if(includeBody){
                initOptions.body = use_formdata ? myFormData : JSON.stringify(values);
            }

            try {
                await fetch(API_ENDPOINT + route, initOptions
                ).then(response => {
                    if(response.status === 401){
                        $logout.logout();
                    }
                    
                    if(response.headers.has('Authorization')){
                        store.commit('user/updateToken', { token: response.headers.get('Authorization')});  
                        let decoded = jwt_decode(response.headers.get('Authorization'));
                        store.commit('user/updatePoints', { points: decoded.points});  
                    }

                    return response.json()
                }).then((data) => {
                    if(data && data.status && data.status == "error"){
                        $notifier.showError(data.message);
                    }
                    resp = data;
                    return data;
                });
            }catch(e){
                console.log("error: " + e);
                $notifier.showError();
            }finally{
                return resp;
            }
        },

        async getImage(route) {
            try {
                const cache = await caches.open('static/image');
                const cachedResponse = await cache.match(route);
            
                if (cachedResponse) {

                    // Return the cached response if it exists
                    return cachedResponse;
                }
            
                // Otherwise, fetch the image from the server
                const headers = new Headers({
                    'Content-Type': 'application/json',
                    Authorization: store.state.user.token,
                });
                const initOptions = {
                    method: 'GET',
                    headers: headers,
                    mode: 'cors',
                    credentials: 'include',
                };
            
                const response = await fetch(API_ENDPOINT + route, initOptions);
                const cloneResponse = response.clone();
                if (response.status === 401) {
                    $logout.logout();
                }
        
                await cache.put(route, response);
                // Return the response
                return cloneResponse;

            } catch (e) {
                console.log('error: ' + e);
                $notifier.showError();
            }
        }
    })
}
	