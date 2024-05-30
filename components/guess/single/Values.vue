<template>
    <div class="overline lh-1">
        <div>
            {{computed1X2}}
        </div>
        <div>
            {{computedUO25}}
        </div>
        <div>
            {{computedGGNG}}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        guess: {type: Object},
    },
    computed:{
        computed1X2(){
            return this.guess.home === this.guess.away ? 'X' : this.guess.home > this.guess.away ? '1' : '2';
        },
        computedUO25(){
            return this.guess.home + this.guess.away > 2 ? 'OVER 2.5' : 'UNDER 2.5'
        },
        computedGGNG(){
            return this.guess.home > 0 && this.guess.away > 0 ? 'GOL' : 'NO GOL';
        }

    }
}
</script>