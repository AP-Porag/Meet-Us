<template>
  <v-app id="inspire">
    <!-- top navigation bar start -->
    <v-app-bar class="primary" dark fixed app>
      <v-app-bar-nav-icon
        @click="drawer = !drawer"
        class="hidden-sm-and-up"
      ></v-app-bar-nav-icon>

      <img src="./assets/logo-white.png" alt="" />

      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer; margin-left: 15px"
          >Meet - Us</router-link
        >
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          dark
          class="primary"
          v-for="menu in menus"
          :key="menu.title"
          :to="menu.link"
        >
          <v-icon left>{{ menu.icon }}</v-icon>
          {{ menu.title }}
        </v-btn>
        <v-btn
          text
          dark
          class="primary"
          v-if="userIsAuthenticated"
          @click="onLogout"
        >
          <v-icon left>mdi-logout-variant</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item
            v-for="menu in menus"
            :key="menu.title"
            router
            :to="menu.link"
          >
            <v-list-item-icon>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ menu.title }}</v-list-item-title>
          </v-list-item>
          <v-list-item router v-if="userIsAuthenticated" @click="onLogout">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <!-- navigation drawer end -->
    <!-- main section start -->
    <v-main class="lighten-3">
      <v-container fluid>
        <v-row>
          <v-col cols="12" sm="9">
            <v-sheet>
              <router-view></router-view>
            </v-sheet>
          </v-col>

          <v-col cols="12" sm="3">
            <v-sheet rounded="lg" min-height="268" class="accent">
              <!--  -->
              <h3>right side box</h3>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <!-- main section end -->
    <!-- footer section start -->
    <v-footer dark padless>
      <v-card flat tile class="primary white--text text-center">
        <v-card-text>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            class="mx-4 white--text"
            icon
          >
            <v-icon size="24px">
              {{ icon }}
            </v-icon>
          </v-btn>
        </v-card-text>

        <v-card-text class="white--text pt-0">
          Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet.
          Mauris cursus commodo interdum. Praesent ut risus eget metus luctus
          accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim
          a sit amet dui. Duis commodo vitae velit et faucibus. Morbi vehicula
          lacinia malesuada. Nulla placerat augue vel ipsum ultrices, cursus
          iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum
          tempor vel ut orci. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>Meet-Us</strong>
        </v-card-text>
      </v-card>
    </v-footer>
    <!-- footer section end -->
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
  computed: {
    menus() {
      let meunItems = [
        {
          title: "view meetups",
          icon: "mdi-account-group",
          link: "/meetups",
        },
        { title: "Sign - up", icon: "mdi-face", link: "/signup" },
        { title: "Sign - in", icon: "mdi-lock-open", link: "/signin" },
      ];
      if (this.userIsAuthenticated) {
        let meunItems = [
          {
            title: "view meetups",
            icon: "mdi-account-group",
            link: "/meetups",
          },
          {
            title: "Organize meetup",
            icon: "mdi-map-marker",
            link: "/meetup/new",
          },
          { title: "Profile", icon: "mdi-camera-account", link: "/profile" },
        ];
        return meunItems;
      }
      return meunItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
  },
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>