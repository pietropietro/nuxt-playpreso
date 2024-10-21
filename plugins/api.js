import { App } from '@capacitor/app';
import jwt_decode from "jwt-decode";

export default ({store, $notifier, $logout, $config: { API_ENDPOINT, VERSION }},inject) => {
	inject('api', {

        async call(route, values, method, use_formdata = false){
            if(!method){
                method = 'GET';
            }

            if(method !== 'GET'){
                store.commit('apiResponses/clearCache');
            }


            // Check cache for GET requests before making a new request
            if (method === 'GET') {
                const cache = store.state.apiResponses.cache[route];
                const fiveMinutes = 300000; // 5 minutes in milliseconds
                if (cache && (Date.now() - cache.timestamp < fiveMinutes)) {

                  return cache.data; // Return cached data if valid
                }

            }

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

            // Check app version for web vs mobile
            let version = VERSION; // Default to web version from Nuxt config
            if (Capacitor.isNativePlatform()) {
                const appInfo = await App.getInfo();
                version = appInfo.version; // Get mobile app version
            }

            let headers = new Headers({
                'Content-Type': 'application/json',
                'X-Frontend-Version': version,
                ...(includeAuth && { 'Authorization': store.state.user.token })
              });
            
            
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
                await fetch(API_ENDPOINT + route, initOptions)
                    .then( async response => {
                        if(response.status === 401){
                            await $logout.logout();
                        }

                        if (response.status === 426) {
                            // Handle 426 status code - Force app update
                            store.commit('apiResponses/setVersionUpdate', true);
                        }

                        if (response.status === 503) {
                            // Handle 503 status code - maintenancemode
                            store.commit('apiResponses/setMaintenanceMode', true);
                        }
                        
                        if(response.headers.has('Authorization')){
                            store.commit('user/updateToken', { token: response.headers.get('Authorization')});  
                            let decoded = jwt_decode(response.headers.get('Authorization'));
                            store.commit('user/updatePoints', { points: decoded.points});  
                        }

                        if (response.status === 204) {
                            return response;
                        }

                        let jsonResp = response.json();
                        if (method === 'GET' && response.ok) {
                            store.commit('apiResponses/setCache', { route: route, data: jsonResp });
                        }
                        return jsonResp;
                        
                    }).then((data) => {
                        if(data && data.status && data.status == "error"){
                            console.error('error:', data.message);
                            $notifier.showError(data.message);
                        }
                        resp = data;
                        return data;
                    });
            }catch (e) {              
                console.error('error:', e);
                $notifier.showError();
            }finally{
                return resp;
            }
        },

        // Clear cache method
        clearAPICache(route) {
            const cachedRoutes = Object.keys(store.state.apiResponses.cache);
            cachedRoutes.forEach(cachedRoute => {
                if (cachedRoute.startsWith(route)) {
                    store.commit('apiResponses/removeResponseCache', cachedRoute);
                }
            });
        },

        async getImage(route) {
            try {
                let fullUrl = API_ENDPOINT + route;

                if ('caches' in self) {
                    let myCache = await caches.open('static/image');
                    let cachedResponse = await myCache.match(fullUrl);
                    if (cachedResponse) {
                        // Return the cached response if it exists
                        return cachedResponse;
                    }
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
                
                const response = await fetch(fullUrl, initOptions);
                const cloneResponse = response.clone();
                if (response.status === 401) {
                    await $logout.logout();
                }
                if (response.status === 404) {
                    return;
                }
                
                if ('caches' in self) {
                    let myCache = await caches.open('static/image');
                    await myCache.put(fullUrl, response);
                }
                // Return the response
                return cloneResponse;

            } catch (e) {
                console.error('error: ' + e, fullUrl);
                // $notifier.showError();
            }
        }
    })
}
	