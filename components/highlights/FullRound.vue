<template>
    <div>
        <div v-for="ppr in ppRounds" :key="ppr.id" class="py-2">
            <guess-user-round :ppRMs="ppr.ppRoundMatches" :rgb="ppr.ppTournamentType.rgb"/>
            <div>
                <user-name small center :user="ppr.user"/>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        ppRounds: {type: Array}
    },
}
</script>