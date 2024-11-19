import { App } from '@capacitor/app';
import jwt_decode from "jwt-decode";

export default ({store, $notifier, $logout, $config: { API_ENDPOINT, VERSION, DEBUG }},inject) => {
	inject('api', {

        async call(route, values, method, use_formdata = false){
            if(!method){
                method = 'GET';
            }

            if(method !== 'GET'){
                store.commit('apiResponses/clearCache');
            }

            // Check cache for GET requests before making a new request
            if (method === 'GET' && DEBUG != true) {
                const cache = store.state.apiResponses.cache[route];
                const cacheDuration = 1 * 60 * 1000; // 1 minutes in milliseconds (120,000 milliseconds)
                if (cache && (Date.now() - cache.timestamp < cacheDuration)) {
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

            
            let includeAuth = store.state.user && store.state.user.ppToken ? true : false;

            // Check app version for web vs mobile
            let version = await this.getAppVersion();

            let headers ={
                'Content-Type': 'application/json',
                'X-Frontend-Version': version,
                ...(includeAuth && { 'Authorization': store.state.user.ppToken })
              };
            
            
            let initOptions = {
                method: method,
                mode: 'cors',
                credentials: 'include'
            };

            initOptions.headers = headers;
            
            if(includeBody && (!!myFormData || !!values)){
                initOptions.body = use_formdata ? myFormData : JSON.stringify(values);
            }

            try {
                let response = await fetch(API_ENDPOINT + route, initOptions);
   
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
                    let ppToken = response.headers.get('Authorization')
                    let decoded = jwt_decode(ppToken);
                    store.commit('user/updateUser', {
                        id: decoded.id,
                        username: decoded.username,
                        admin:decoded.admin,
                        created_at: decoded.created_at,
                        ppToken: decoded.ppToken, 
                        points: decoded.points
                    });  
                }

                if (response.status === 204) {
                    return response;
                }

                let jsonResp = await response.json();
                if (method === 'GET' && response.ok) {
                    store.commit('apiResponses/setCache', { route: route, data: jsonResp });
                }
                
                if(jsonResp && jsonResp.status && jsonResp.status == "error"){
                    console.error('error:', jsonResp.message);
                    $notifier.showError(jsonResp.message);
                }
                return jsonResp;
                    
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

                let version = await this.getAppVersion();
                // Otherwise, fetch the image from the server
                const headers = {
                    'Content-Type': 'application/json',
                    'X-Frontend-Version': version,
                    'Authorization': store.state.user.ppToken,
                };
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
        },

        async getAppVersion(){
            // Check app version for web vs mobile
            let version = VERSION; // Default to web version from Nuxt config
            if (process.client && Capacitor.isNativePlatform()) {
                const appInfo = await App.getInfo();
                version = appInfo.version; // Get mobile app version
            }
            return version;
        },

    })
}
	