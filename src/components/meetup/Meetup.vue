<template>
  <v-container>
    <v-layout row class="mt-5">
      <v-flex xs12 class="text-center">
        <v-progress-circular
            :size="50"
            :width="7"
            color="primary"
            indeterminate
            v-if="loading"
        ></v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-card>
          <v-card-title>
            <h4 class="primary--text">{{ meetup.title }}</h4>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <edit-meetup :meetup="meetup"></edit-meetup>
              <v-btn fab small class="error ml-3">
                <v-icon>mdi-delete-alert-outline</v-icon>
              </v-btn>
            </template>
          </v-card-title>
          <v-img
            class="white--text align-end"
            height="450px"
            :src="meetup.imageURL"
          >
          </v-img>
          <v-card-text>
            <div class="info--text">
              {{ meetup.date | date }} - <span class="error--text">{{ meetup.location }}</span>
            </div>
            <div class="">
              <p>
                {{ meetup.description }}
              </p>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="orange" text
              ><v-badge color="green" :content="meetup.like"
                ><v-icon>mdi-thumb-up</v-icon>
              </v-badge>
            </v-btn>
            <v-btn color="orange" text
              ><v-badge color="green" :content="meetup.comment"
                ><v-icon>mdi-comment</v-icon>
              </v-badge>
            </v-btn>
            <v-avatar size="36px" class="ml-3">
              <img
                alt="Avatar"
                src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
              />
            </v-avatar>
            <v-text-field
              placeholder="Make A Comment"
              class="ml-3"
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn color="orange" text> Share </v-btn>
            <v-btn color="orange" text> Register </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      return this.$store.getters.meetup(this.id) || {};
    },
    userIsAuthenticated() {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined;
    },
    userIsCreator(){
      if (!this.userIsAuthenticated){
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorID
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
};
</script>