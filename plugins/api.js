export default ({app,store, $notifier, $config: { API_ENDPOINT }},inject) => {
	inject('api', {
        //POST or PUT
        async call(route ,values, method = "POST"){
            let formdata = new FormData();
            values.map((item) => {
                let key = Object.keys(item)[0];
                formdata.append(key, item[key]);
            });
            let resp;
            try {
                await fetch(API_ENDPOINT + route,{
                    method: method,
                    mode: 'cors',
                    body: formdata,
                }).then(response => {
                    return response.json()
                }).then((data) => {
                    if(data.status && data.status == "error"){
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


        //TODO merge both function in this one below
        async get(route){
            let resp;
            console.log("store",store.state.user.token);
            try {
                await fetch(API_ENDPOINT + route,{
                    method: 'GET',
                    mode: 'cors',
                    credentials: 'include',
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': store.state.user.token,
                    })
                }).then(response => {
                    return response.json()
                }).then((data) => {
                    if(data.status && data.status == "error"){
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
	
