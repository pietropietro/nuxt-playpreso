<template>
    <em-emoji v-if="isMoreThanHoursAgo(match.date_start, 2) && !match.verified_at"
        id="exclamation" size="2em"
    />
    <div v-else-if="isLive(match.date_start)">
        <div 
            class="pa-1 blink red rounded-circle d-inline-block"
        />
        <div class="text-center font-weight-bold overline blink lh-1 red--text mt-n1">LIVE</div>
    </div>
    <div v-else-if="!match.verified_at && isToday(new Date(match.date_start.replace(/-/g, '/')))" class="lh-1">
        <template v-if="!match.verified_at">
            <em-emoji id="alarm_clock" />  <br/>
            <span class="overline lh-1">{{formatTime(match.date_start)}}</span>
        </template>
    </div>
    
    <div v-else-if="inNextDays(new Date(match.date_start.replace(/-/g, '/')))"
        style="line-height: 0.6;"
    >
        <span class="overline font-weight-bold text-center"
            style="line-height: 1;"
            v-html="breakDayIntoLines(formatDate(match.date_start))"
        />
    </div>
    <div v-else class="overline lh-1 text-center">
        {{ formatDay(match.date_start) }} <br>
        {{ formatMonth(match.date_start) }}
    </div>
</template>
<script>
export default {
    props:{
        match: {type: Object}
    }
}
</script>