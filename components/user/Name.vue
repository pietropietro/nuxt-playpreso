<template>
    <v-row
      no-gutters
      class="flex-nowrap"
      :justify="center ? 'center' : 'start'"
      align="center"
      v-if="user"
    >
      <!-- Username with Dynamic Styling -->
      <v-col cols="auto" :class="current ? 'currentuser' : ''">
        <nuxt-link :to="ROUTES.USER.DETAIL + user.username" class="no-decoration">
          <component :is="headingTag">
            <!-- display flex for removing space between spans -->
            <span style="display: flex;" v-html="getStyledUsername"></span>
          </component>
        </nuxt-link>
      </v-col>
  
      <!-- Emojis -->
      <v-col cols="auto">
        <v-row no-gutters align="center">
          <template v-for="(emoji, index) in userEmojis" >
            <em-emoji :id="emoji" class="ml-1 mt-1" :key="index" />
          </template>
        </v-row>
      </v-col>
    </v-row>
  </template>

<script>
export default {
  props: {
    user: { type: Object, required: true },
    current: { type: Boolean, default: false },
    center: { type: Boolean, default: false },
    small: { type: Boolean, default: false },
    xSmall: { type: Boolean, default: false }, // New prop for x-small size
  },
  computed: {
    // Determine the heading tag based on size
    headingTag() {
      if (this.xSmall) return 'h4';
      if (this.small) return 'h3';
      return 'h1';
    },
    // Generate styled username with dynamic colors
    getStyledUsername() {
      const username = this.user.username;
      if (this.user.ppRanking?.position === 1) {
        return `<span class="gold--text">${username}</span>`;
      }
      if (this.user.motdLeader && this.user.flashLeader) {
        const half = Math.ceil(username.length / 2);
        return `
          <span class="green--text">${username.substring(0, half)}</span>
          <span class="grey--text">${username.substring(half)}</span>
        `;
      }
      if (this.user.motdLeader) {
        const half = Math.ceil(username.length / 2);
        return `
          <span class="green--text">${username.substring(0, half)}</span>
          <span class="white--text">${username.substring(half)}</span>
        `;
      }
      if (this.user.flashLeader) {
        const half = Math.ceil(username.length / 2);
        return `
          <span class="white--text">${username.substring(0, half)}</span>
          <span class="grey--text">${username.substring(half)}</span>
        `;
      }
      return username;
    },
    // Generate emojis based on user properties
    userEmojis() {
      const emojis = [];
      // Add stars for trophies
      for (let i = 0; i < Math.floor(this.user.trophies_count / 10); i++) {
        emojis.push('star');
      }
      // Add crown for top ranking
      if (this.user.ppRanking?.position === 1) {
        emojis.push('crown');
      }
      // Add jigsaw for motdLeader
      if (this.user.motdLeader) {
        emojis.push('jigsaw');
      }
      // Add zap for flashLeader
      if (this.user.flashLeader) {
        emojis.push('zap');
      }
      return emojis;
    },
  },
};
</script>


<style scoped>

.currentuser {
  font-weight: bold; /* Example style for current user */
}

/* Add any additional styles here */
</style>