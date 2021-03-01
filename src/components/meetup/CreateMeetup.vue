<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h4 class="primary--text text-center text-uppercase">
          create a new meetup
        </h4></v-flex
      >
    </v-layout>
    <v-layout row class="mb-5">
      <v-flex xs12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                name="title"
                label="Title"
                id="title"
                required
                v-model="title"
              >
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                color="purple darken-2"
                label="Location"
                required
                id="location"
                name="location"
                v-model="location"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="image" alt="" height="150" />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn block class="primary" @click="onClickFile"
                >Upload Image</v-btn
              >
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept="image/*"
                @change="onFilePicked"
              />
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-textarea
                color="teal"
                name="description"
                label="Description"
                id="description"
                v-model="description"
              />
            </v-flex>
          </v-layout>
          <v-layout row class="mb-5">
            <v-flex xs12 sm6>
              <v-date-picker
                v-model="date"
                class="mt-4"
                elevation="15"
              ></v-date-picker>
            </v-flex>
            <v-flex xs12 sm6>
              <v-time-picker
                format="24hr"
                elevation="15"
                v-model="time"
              ></v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                block
                outlined
                color="indigo"
                x-large
                :disabled="!formIsValid"
                type="submit"
                >Create meetup</v-btn
              >
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      image: "",
      description: "",
      date: new Date().toISOString().substr(0, 10),
      time: new Date(),
      imageRaw: null,
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" && this.location !== "" && this.description !== ""
      );
    },
    submitableDateTime() {
      const date = new Date(this.date);

      if (typeof this.time === "string") {
        let hours = this.time.match(/^(\d+)/)[1];
        const minutes = this.time.match(/:(\d+)/)[1];

        date.setHours(hours);
        date.setMinutes(minutes);
      } else {
        date.setHours(this.time.getHours());
        date.setMinutes(this.time.getMinutes());
      }
      return date;
    },
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      if (!this.imageRaw) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        image: this.imageRaw,
        description: this.description,
        date: this.submitableDateTime,
      };
      console.log(meetupData);
      this.$store.dispatch("createMeetup", meetupData);
      this.$router.push("/meetups");
    },
    onClickFile() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      let fileName = files[0].name;
      if (fileName.lastIndexOf(".") <= 0) {
        return alert("please upload a valid file !");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.image = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.imageRaw = files[0];
    },
  },
};
</script>