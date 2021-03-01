<template>
    <v-dialog
        v-model="dialog"
        max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
            fab small class="primary"
            v-bind="attrs"
            v-on="on"
        >
          <v-icon>mdi-pencil-outline</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-title class="text-capitalize">Edit Meetup</v-card-title>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <v-text-field
                    name="title"
                    label="Title"
                    id="title"
                    v-model="editedTitle"
                    required></v-text-field>
                <v-text-field
                    name="description"
                    label="Description"
                    id="description"
                    v-model="editedDescription"
                    required></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-layout row wrap class="mt-3">
            <v-flex xs12>
              <v-card-actions>
                <v-btn
                    class="blue--text darken-1"
                    @click="dialog = false"
                >Close
                </v-btn>
                <v-btn class="blue--text darken-1" @click="onSaveChange">Save</v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
  props:['meetup'],
  data() {
    return {
      editedTitle: this.meetup.title,
      editedDescription: this.meetup.description,
      dialog:false
    }
  },
  methods:{
    onSaveChange(){
      if (this.editedTitle.trim() ==='' || this.editedDescription.trim() === ''){
        return
      }
      this.dialog = false
      const meetupData = {
        id:this.meetup.id,
        title: this.editedTitle,
        description: this.editedDescription,
      };
      this.$store.dispatch('updateMeetUpData',meetupData)
    }
  }
}
</script>