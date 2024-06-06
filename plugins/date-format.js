import Vue from 'vue'

Vue.mixin({
    data:()=>({
        timeFormat : { hour: 'numeric', minute: 'numeric'},
        dateTimeFormat : {day:'2-digit', month: '2-digit', year: '2-digit', hour: 'numeric', minute: 'numeric'},
        dateFormat : {day:'2-digit', month: '2-digit', year: '2-digit'},
        weekDateTimeFormat  : {weekday:'long', hour: 'numeric', minute: 'numeric'} ,
        weekDateFormat  : {weekday:'long'} ,
        monthYearFormat  : {month:'long', year:'2-digit'} ,
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
                let formattedDate = Intl.DateTimeFormat(
                    'en-GB', 
                    withTime ? this.weekDateTimeFormat : this.weekDateFormat
                )
                .format(dateObject)
                .toString()
                .toUpperCase();

                return formattedDate;
            }

            let formattedDate = Intl.DateTimeFormat('en-GB', withTime ? this.dateTimeFormat : this.dateFormat).format(dateObject);
            if(withTime) formattedDate = formattedDate.replace(',', ' -');
            return formattedDate;
        },
        formatMonthYear(dateString){
            return Intl.DateTimeFormat('en-GB', this.monthYearFormat).format(new Date(dateString));
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
        isWithinNext24Hours(dateString) {
            // Get the current timestamp
            let currentTime = new Date().getTime();

            // Calculate the timestamp for the current time plus 24 hours
            let next24Hours = currentTime + (24 * 60 * 60 * 1000);

            // Parse the given match's start date
            let matchDate = new Date(dateString).getTime();

            // Compare the match's start date with the current time plus 24 hours
            return matchDate <= next24Hours;
        },
        inNextDays(someDate){
            let inFiveDays = new Date().setDate( new Date().getDate() + 5);
            if(someDate < inFiveDays && someDate > new Date()){
                return true;
            }
        }
    }
});