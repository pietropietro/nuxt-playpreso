export default {
    async doLogin(){
        let values = [
            {'action' : "logIn"},
            {'username': this.username},
            {'password': this.password}
        ]
        let response = await this.$api.call(values);
        console.log("done");
    }
}