export default ({app,store, $config: { API_ENDPOINT }},inject) => {
	inject('api', {
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
                        store.commit('snackbar/showMessage', { content: data.message, color: 'red' });
                    }
                    resp = data;
                    return data;
                });
            }catch(e){
                store.commit('snackbar/showMessage', { content: 'error', color: 'red' });
            }finally{
                return resp;
            }
        },
    })
}
	
