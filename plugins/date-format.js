import Vue from 'vue'

Vue.mixin({
    methods:{
        formatDate(dateString){
            let dateObject = new Date(dateString);
            if(this.isToday(dateObject)){
                return 'TODAY ' + Intl.DateTimeFormat('en-GB',{timeStyle: 'short' }).format(dateObject)
            }
            if(this.isToday(dateObject, 1)){
                return 'TOMORROW ' + Intl.DateTimeFormat('en-GB',{timeStyle: 'short' }).format(dateObject)
            }
            if(this.isToday(dateObject, -1)){
                return 'YESTERDAY ' + Intl.DateTimeFormat('en-GB',{timeStyle: 'short' }).format(dateObject)
            }

            return Intl.DateTimeFormat('en-GB',{ dateStyle: 'medium', timeStyle: 'short' }).format(dateObject)
        },
        isToday(someDate, changeTime) {
            const today = new Date();
            if(changeTime){
                today.setDate(today.getDate() + changeTime);
            }
            return someDate.getDate() == today.getDate() &&
                someDate.getMonth() == today.getMonth() &&
                someDate.getFullYear() == today.getFullYear()
        }
    }
});