export default ({app,store, $notifier, $logout, $config: { API_ENDPOINT }},inject) => {
	inject('api', {
       
        async call(route, values, method){
            let resp;
            let formdata;
            const noBody = ["GET" , "DELETE"];

            let includeBody = !!method && !noBody.includes(method) ? true : false;
            if(includeBody){
                formdata = new FormData();
                values.map((item) => {
                    let key = Object.keys(item)[0];
                    formdata.append(key, item[key]);
                });
            }

            let includeAuth = store.state.user && store.state.user.token ? true : false;
            let headers = includeAuth ? new Headers({
                'Content-Type': 'application/json',
                'Authorization': store.state.user.token,
            }) : new Headers({'Content-Type': 'application/json'});

            let initOptions = {
                method: method,
                mode: 'cors',
                credentials: 'include'
            };
            if(includeAuth){
                initOptions.headers = headers;
            }
            if(includeBody){
                initOptions.body = formdata;
            }

            try {
                await fetch(API_ENDPOINT + route, initOptions
                ).then(response => {
                    if(response.status === 403){
                        $logout.logout();
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
        }
    })
}
	
