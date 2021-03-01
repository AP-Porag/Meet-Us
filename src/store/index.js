import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetups: [],
    user: null,
    loading:false,
    error:null,
  },
  mutations: {
    setLoadedMeetups(state,payload){
      state.meetups = payload
    },
    createMeetup(state,payload){
      state.meetups.push(payload)
    },
    setUser(state,payload){
      state.user = payload
    },
    setLoading(state,payload){
      state.loading = payload
    }
    ,
    setError(state,payload){
      state.error = payload
    },
    clearError(state){
      state.error = null
    }
  },
  actions: {
    loadMeetups({commit}){
      commit('setLoading',true)
      firebase.database().ref('meetups').once('value')
      .then((data)=>{
        const meetups = []
        const obj = data.val()
        for (let key in obj) {
          meetups.push({
            id:key,
            title:obj[key].title,
            description:obj[key].description,
            location:obj[key].location,
            imageURL:obj[key].imageURL,
            date:obj[key].date,
            creatorID:obj[key].creatorID
          })
          
        }
        commit('setLoading',false)
        commit('setLoadedMeetups',meetups)
      })
      .catch((error)=>{
        console.log(error)
        commit('setLoading',true)
      })
    },
    createMeetup({commit,getters},payload){
      const meetup = {
        title : payload.title,
        location : payload.location,
        description:payload.description,
        date:payload.date.toISOString(),
        creatorID:getters.user.id
      }
      //reachout to firebase and store it
      let imageURL;
      let key;
      firebase.database().ref('meetups').push(meetup)
      .then((data)=>{
        console.log(data)
        key = data.key
        return key
      })
      .then(key=>{
        const fileName = payload.image.name
        const ext = fileName.slice(fileName.lastIndexOf('.')+1)
        return firebase.storage().ref('meetups/'+key+'.'+ext).put(payload.image)
      })
      .then(fileData => {

        return fileData.ref.getDownloadURL()
      
         .then(url => {
      
            imageURL = url
            return firebase.database().ref('meetups').child(key).update({ imageUrl: url })
      
         })
      
      })
      //.then(fileData =>{
        //imageURL = fileData.metadata.downloadsURLs[0]
        //console.log(imageURL)
        //return firebase.database().ref('meetups').child(key).update({imageURL:imageURL})
      //})
      .then(()=>{
          commit('createMeetup',{
          ...meetup,
          imageURL:imageURL,
          id: key
        })
      })
      .catch((error)=>{
        console.log(error)
      })
      
      
    },
    signUserUp({commit},payload){
      commit('setLoading',true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email,payload.password)
      .then(
        user=>{
          commit('setLoading',false)
          const newUser = {
            id: user.user.uid,
              registeredMeetups: []
          }
          commit('setUser',newUser)
        }
      )
      .catch(
        error=>{
          commit('setLoading',false)
          commit('setError',error)
          console.log(error)
        }
      )
    },
    signUserIn({commit},payload){
      commit('setLoading',true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email,payload.password)
      .then(
        user=>{
          commit('setLoading',false)
          const newUser = {
            id: user.user.uid,
              registeredMeetups: []
          }
          commit('setUser',newUser)
        }
      )
      .catch(
        error=>{
          commit('setLoading',false)
          commit('setError',error)
          console.log(error)
        }
      )
    },
    autoSignIn({commit},payload){
      commit('setUser',{id:payload.uid,registeredMeetups:[]})
    },
    logout({commit}){
      firebase.auth().signOut()
      commit('setUser',null)
    },
    clearError({commit}){
      commit('clearError')
    }
  },
  getters:{
    meetups(state){
      return state.meetups.sort((meetupA,meetupB)=>{
          return meetupA.date > meetupB.date
      })
    },
    featuredMeetups(state,getters){
      return getters.meetups.slice(0,5)
    },
    restMeetups(state,getters){
      return getters.meetups.slice(6,12)
    },
    meetup(state){
        return (meetupID)=>{
          return state.meetups.find((meetup)=>{
            return meetup.id === meetupID
          })
        }
    },
    user(state){
      return state.user
    },
    loading(state){
      return state.loading
  },
    error(state){
        return state.error
    }

  },
  modules: {
  }
})
