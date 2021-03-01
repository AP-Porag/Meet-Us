<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card v-for="meetup in meetups" :key="meetup.id" class="mb-3">
          <v-container fluid>
            <v-layout row>
              <v-flex xs4>
                <v-img
                  class="white--text align-end"
                  height="200px"
                  :src="meetup.imageURL"
                >
                </v-img>
              </v-flex>
              <v-flex xs8>
                <v-card-title>{{ meetup.title }}</v-card-title>
                <v-card-subtitle class="pb-0">
                  {{ meetup.date | date }}</v-card-subtitle
                >
                <v-card-text>
                  <p>
                    {{ meetup.description }}
                  </p>
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

                  <v-btn color="orange" text :to="'/meetup/' + meetup.id">
                    Explore
                  </v-btn>
                  <v-btn color="orange" text> Register </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.meetups;
    },
  },
};
</script>