<template>
    <h3 class="ocrastd">{{ formatTime(timeLeft) }}</h3>
</template>   

<script>
export default{
    props:{
        until_datetime: {type: String, required:true},
        onCountDownFinished: {type: Function}
    },
    data(){
        return{
            intervalId: null,      // holds setInterval reference
            timeLeft: 0,           // in seconds, for example
        }
    },
    methods:{
       
        startCountDown() {
            // 1) Parse the match date/time (assuming next.match.date_start is e.g. "2025-01-20 20:30:00")
            //    Adjust or consider timezones if needed
            const matchTime = new Date(this.until_datetime.replace(' ', 'T')); 
            // if you must ensure UTC or specific offset, do so here

            // 2) Immediately compute initial timeLeft
            this.updateTimeLeft(matchTime);

            // 3) Setup interval every 1s
            this.intervalId = setInterval(() => {
                this.updateTimeLeft(matchTime);
            }, 1000);
        },

        stopCountDown() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },

        async updateTimeLeft(matchTime) {
            const now = new Date();
            const diffMs = matchTime - now;
            if (diffMs <= 0) {
                // time is up => set to 0
                this.timeLeft = 0;
                // call optional callback
                console.log('CountDown finished. ');
                this.stopCountDown();
                await this.onCountDownFinished();
                // Check if a new `until_datetime` exists and is in the future
                const newMatchTime = new Date(this.until_datetime.replace(' ', 'T'));
                if (newMatchTime > now) {
                    console.log('New countdown starting for:', this.until_datetime);
                    this.startCountDown(); // Restart countdown with the new time
                }
            } else {
                // Convert ms -> seconds (you can remain in ms if you prefer)
                this.timeLeft = Math.floor(diffMs / 1000);
            }
        },

        /**
         * Utility: format timeLeft (in seconds) as HH:MM:SS
         */
        formatTime(seconds) {
            const h = Math.floor(seconds / 3600);
            const m = Math.floor((seconds % 3600) / 60);
            const s = seconds % 60;

            // zero-pad if needed
            const hh = h < 10 ? '0' + h : '' + h;
            const mm = m < 10 ? '0' + m : '' + m;
            const ss = s < 10 ? '0' + s : '' + s;

            if (h > 0) {
                return `${hh}:${mm}:${ss}`;
            } else {
                // If you want to hide hours if zero
                return `${mm}:${ss}`;
            }
        },
    },
    mounted() {
        this.startCountDown();
    },
    beforeDestroy() {
        this.stopCountDown();
    },
}
</script>