import Vue from 'vue'

Vue.mixin({
    data:()=>({
        timeFormat : { hour: 'numeric', minute: 'numeric'},
        dateTimeFormat : {day:'2-digit', month: '2-digit', year: '2-digit', hour: 'numeric', minute: 'numeric'},
        dateFormat : {day:'2-digit', month: '2-digit', year: '2-digit'},
        weekDateTimeFormat  : {weekday:'long', hour: 'numeric', minute: 'numeric'} ,
        weekDateFormat  : {weekday:'long'} ,
    }),
    methods:{
        formatTime(dateString){
            return Intl.DateTimeFormat('en-GB', this.timeFormat).format(new Date(dateString));
        },
        formatDate(dateString, withTime=false){
            if(!dateString)return null;
            //handle SAFARI date error replacing - with /
            let dateObject = new Date(dateString.replace(/-/g, "/"));
            
            if(this.isToday(dateObject)){
                return 'TODAY ' + (withTime ? Intl.DateTimeFormat('en-GB', this.timeFormat).format(dateObject) : '');
            }
            if(this.isToday(dateObject, 1)){
                return 'TOMORROW ' + (withTime ? Intl.DateTimeFormat('en-GB', this.timeFormat).format(dateObject) : '');
            }
            if(this.isToday(dateObject, -1)){
                return 'YESTERDAY ' + (withTime ? Intl.DateTimeFormat('en-GB', this.timeFormat).format(dateObject) : '');
            }
            if(this.inNextDays(dateObject)){
                return Intl.DateTimeFormat('en-GB', withTime ? this.weekDateTimeFormat : this.weekDateFormat).format(dateObject).toString().toUpperCase();
            }

            return Intl.DateTimeFormat('en-GB', withTime ? this.dateTimeFormat : this.dateFormat).format(dateObject);
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