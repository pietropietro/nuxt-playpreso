<template>
    <div class="lh-1">
        <p-p-emoji :model="match.league?.country" />
        <span class="overline lh-1">{{match.league.tag}}</span>
                    
        <h4>{{match.homeTeam?.name}}</h4>
        <h4>{{match.awayTeam?.name}}</h4>
        <div class="overline lh-1">{{formatDate(match.date_start, true)}}</div>
    </div>
</template>
<script>
export default {
    props:{
        match: {type: Object, required: true}
    }
}
</script>