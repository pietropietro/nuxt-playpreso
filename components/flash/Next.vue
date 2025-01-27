<template>
    <p-p-r-m-blue-print :pprm="next" :onUnlockedClick="onSelect" :onCountDownFinished="onCountDownFinished" >
        
    </p-p-r-m-blue-print>
</template>   

<script>
export default{
    props:{
        next: {type: Object, required:true}
    },
    methods:{
        onSelect(){
            if(this.next.guess.guessed_at || this.next.match.verified_at) return;
            this.next.guess.match = this.next.match;
            this.$store.dispatch('openGuesses/update', {
                newGuess: this.next.guess,
                newList: [this.next.guess], 
            });
        },
        onCountDownFinished(){
            this.$store.commit('homepageApi/setLoadingKey', {key: 'flash', isLoading: true});
        }
    },
  
}
</script>