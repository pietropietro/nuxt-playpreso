import Vue from 'vue'

Vue.mixin({
    methods:{
        formatDate(dateString){
            //handle SAFARI date error replacing - with /
            let dateObject = new Date(dateString.replace(/-/g, "/"));

            let hourStyle= { hour: 'numeric', minute: 'numeric'};
            let dateStyle= {day:'2-digit', month: '2-digit', year: '2-digit', hour: 'numeric', minute: 'numeric'};
            let weekDateStyle = {weekday:'long', hour: 'numeric', minute: 'numeric'} ;
            
            if(this.isToday(dateObject)){
                return 'TODAY ' + Intl.DateTimeFormat('en-GB', hourStyle).format(dateObject);
            }
            if(this.isToday(dateObject, 1)){
                return 'TOMORROW ' + Intl.DateTimeFormat('en-GB', hourStyle).format(dateObject);
            }
            if(this.isToday(dateObject, -1)){
                return 'YESTERDAY ' + Intl.DateTimeFormat('en-GB', hourStyle).format(dateObject);
            }
            if(this.inNextDays(dateObject)){
                return Intl.DateTimeFormat('en-GB', weekDateStyle).format(dateObject).toString().toUpperCase();
            }

            return Intl.DateTimeFormat('en-GB', dateStyle).format(dateObject);
        },
        isToday(someDate, changeTime) {
            const today = new Date();
            if(changeTime){
                today.setDate(today.getDate() + changeTime);
            }
            return someDate.getDate() == today.getDate() &&
                someDate.getMonth() == today.getMonth() &&
                someDate.getFullYear() == today.getFullYear()
        },
        inNextDays(someDate){
            let inFiveDays = new Date().setDate( new Date().getDate() + 5);
            if(someDate < inFiveDays && someDate > new Date()){
                return true;
            }
        }
    }
});