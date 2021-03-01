import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import DateFilter from './filters/date'
import AlertComponent from './components/shared/Alert'
import EditMeetUpComponent from './components/meetup/eidt/EditMeetup'

Vue.config.productionTip = false
Vue.filter('date',DateFilter)
Vue.component('app-alert',AlertComponent)
Vue.component('edit-meetup',EditMeetUpComponent)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created(){
    firebase.initializeApp({
      apiKey: "AIzaSyDz_CjW3_1LOxmtgUE2b3m6SPaAkR-QnGk",
    authDomain: "meet-us-672fc.firebaseapp.com",
    projectId: "meet-us-672fc",
    storageBucket: "gs://meet-us-672fc.appspot.com",
    messagingSenderId: "48531732089",
    appId: "1:48531732089:web:22526f447a7d2d5941c6a8",
    measurementId: "G-T45MR8E99F"
    })

    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        this.$store.dispatch('autoSignIn',user)
      }
    })
    this.$store.dispatch('loadMeetups')
  }
}).$mount('#app')
