<template>
    <v-row no-gutters class="font-italic">
        <h1 v-if="level===1 || cupFormat[level - 1].random_draw">?</h1>

        
        <h3 v-else-if="level===2">
            <!-- for best 3rds (like euro cup) -->
            <template v-if="!isNaN(tag.charAt(position - 1))">
                best {{tag.charAt(position - 1)}}°
            </template>
            <template v-else>
                {{ displayPosition }}°
                {{ currentLetter }}
            </template>
        </h3>

        <h3 v-else class="text-lowercase">
            winner {{cupFormat[level - 2].name}}
            {{ indexOfTag }}
        </h3>
    </v-row>
</template>
<script>
export default {
    props: {
        tag: {type: String},
        level: {type: Number},
        position: {type: Number},
        cupFormat: {type: Array}
    },
    computed: {
        displayPosition() {
            // Check if the current tag has the special character '+'
            if (this.tag.startsWith('+') && this.position === 1) {
                // Adjust the position by adding 1 for the first position if '+' is present
                return this.position + 1;
            }
            if (this.tag.charAt(1) === '-' && this.position === 2) {
                // Adjust the position by adding 1 for the first position if '+' is present
                return this.position - 1;
            }
            return this.position;
        },
        indexOfTag(){
            let index = this.cupFormat[this.level - 2].group_tags.
                indexOf(
                    this.position === 1 ? this.tag.slice(0, this.tag.length/2) 
                        : this.tag.slice(this.tag.length/2, this.tag.length)
                ) +1;
            console.log(index);
            return index > 0 ? '- ' + index : null;
        },
        currentLetter() {
            // Remove '+'  '-' if it is present to get the correct letter
            const cleanTag = this.tag.replace(/[+-]/g, '');
            // Return the correct letter based on the position (1-based index)
            return cleanTag.slice(this.position - 1, this.position);
        }
    }
}
</script>