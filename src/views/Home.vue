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
      <v-flex xs="12">
        <v-carousel
          cycle
          height="400"
          delimiter-icon="mdi-minus"
          show-arrows-on-hover
          style="cursor: pointer"
        >
          <template v-slot:prev="{ on, attrs }">
            <v-btn color="success" v-bind="attrs" v-on="on"
              >Previous slide</v-btn
            >
          </template>
          <template v-slot:next="{ on, attrs }">
            <v-btn color="info" v-bind="attrs" v-on="on">Next slide</v-btn>
          </template>
          <v-carousel-item
            v-for="meetup in meetups"
            :key="meetup.id"
            :src="meetup.imageURL"
            @click="onLoadMeetup(meetup.id)"
          >
            <h3 class="title">{{ meetup.title }}</h3>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-row class="mt-5">
      <h3 class="bootom_text">Join Our Awsome Meetups !</h3>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups;
    },
    loading() {
      return this.$store.getters.loading;
    },
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push("/meetup/" + id);
    },
  },
};
</script>
<style scoped>
.title {
  position: absolute;
  bottom: 50px;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  padding-top: 10px;
}
.bootom_text {
  text-align: center;
  width: 100%;
  padding: 10px;
  color: #1a237e;
  text-transform: uppercase;
}
</style>