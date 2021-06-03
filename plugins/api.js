export default ({ app, store }, inject) => {
	inject('api', {
        async call(values, method = "POST"){
            let formdata = new FormData();

            values.map((item) => {
                let key = Object.keys(item)[0];
                formdata.append(key, item[key]);
            });
            // formdata.append('action', "logIn");
            // formdata.append('username', "mario");
            // formdata.append('password', "mario");
            try {
                await fetch('http://www.playpreso.com/api.php',{
                    method: method,
                    mode: 'cors',
                    body: formdata,

                }).then(response => {
                    console.log(response,"response");
                    return response.json()
                }).then((data) => {
                    console.log(data,"data");
                    return data;
                });
            }catch(e){
                console.log(e);
            }
		}
	})
}