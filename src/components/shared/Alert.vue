<template>
  <v-alert
    @input="onClose"
    border="left"
    close-text="Close Alert"
    class="error"
    :value="true"
    dismissible
  >
    {{ text }}
  </v-alert>
</template>
<script>
export default {
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    },
  },
};
</script>