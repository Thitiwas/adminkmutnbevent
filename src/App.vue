<template>
<div id="app">
  <!-- startheader -->
  <nav class="nav_has-shadow" v-show="!statuslogin">
  </nav>

  <nav class="nav" v-show="!statuslogin">
    <div class="nav-left">
      <a class="brand" href="#">
        <strong class="orange">KMUTNB</strong> <strong class="black">Event for admin</strong>
      </a>
    </div>
    <br>
    <div class="nav-right">
      <span class="nav-item">
        <div @click="logout()" class="sizelogout">logout</div>
        </span>
    </div>
  </nav>
  <!-- endheader -->

  <div v-show="statuslogin" class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Admin Login</p>
      </header>
      <section class="modal-card-body">
        <label class="label">Adminname</label>
        <p class="control">
          <input class="input" type="text" v-model="adminname1">
        </p>
        <label class="label">password</label>
        <p class="control">
          <input class="input" type="password" v-model="password1">
        </p>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary" @click="checkadmin(adminname1, password1)">Login</a>&nbsp;&nbsp;&nbsp;{{alertLogin}}
      </footer>
    </div>
  </div>
  <add-event v-show="!statuslogin" :add = "add" :events = "events" :removeEvent = "removeEvent" :updateEvent = "updateEvent" :users = "users" :password = "password"></add-event>
</div>
</template>

<script>
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyBc4O3qrb1xoIZN4jTmWmGvAYWCxvE2x-A',
  authDomain: 'kmutnbevent.firebaseapp.com',
  databaseURL: 'https://kmutnbevent.firebaseio.com',
  storageBucket: 'kmutnbevent.appspot.com',
  messagingSenderId: '1024101975238'
}
firebase.initializeApp(config)
var Users = firebase.database().ref('users')
var Events = firebase.database().ref('events')
import AddEvent from './components/AddEvent.vue'
export default {
  name: 'app',
  components: {
    AddEvent
  },
  data () {
    return {
      users: [],
      adminname: 'admin',
      password: 'admin',
      adminname1: '',
      password1: '',
      statuslogin: true,
      alertLogin: '',
      events: [],
      count: 0,
      changeEdit: {
        name: '',
        location: '',
        map: '',
        date: '',
        contact: '',
        picture: '',
        detail: ''
      }
    }
  },
  mounted () {
    var vm = this
    Events.on('child_added', function (eventNow) {
      var item = eventNow.val()
      item.id = eventNow.key
      vm.events.push(item)
    })
    Events.on('child_removed', function (eventNow) {
      var id = eventNow.key
      var index = vm.events.findIndex(event => event.id === id)
      vm.events.splice(index, 1)
    })
    Events.on('child_changed', function (eventNow) {
      var id = eventNow.key
      var event = vm.events.find(events => events.id === id)
      event.name = eventNow.val().name
      event.location = eventNow.val().location
      event.map = eventNow.val().map
      event.date = eventNow.val().date
      event.contact = eventNow.val().contact
      event.detail = eventNow.val().detail
      event.picture = eventNow.val().picture
    })
    Users.on('child_added', function (eventNow) {
      var item = eventNow.val()
      item.id = eventNow.key
      vm.users.push(item)
    })
    Users.on('child_removed', function (eventNow) {
      var id = eventNow.key
      var index = vm.users.findIndex(user => user.id === id)
      vm.users.splice(index, 1)
    })
  },
  methods: {
    checkadmin (adminname1, password1) {
      this.adminname1 = adminname1
      this.password1 = password1
      if (this.adminname1 === this.adminname && this.password1 === this.password) {
        this.statuslogin = false
      } else if (this.adminname1 !== this.adminname && this.password1 === this.password) {
        this.statuslogin = true
        this.alertLogin = 'Check your username again'
      } else if (this.adminname1 === this.adminname && this.password1 !== this.password) {
        this.statuslogin = true
        this.alertLogin = 'Check your password again'
      } else if (this.adminname1 === '' && this.password1 === '') {
        this.statuslogin = true
        this.alertLogin = 'Check your username&password again'
      }
    },
    logout () {
      this.statuslogin = true
      this.adminname1 = ''
      this.password1 = ''
      this.alertLogin = ''
    },
    add (name, location, map, date, contact, picture, detail) {
      var eventNow = {
        name: name,
        location: location,
        map: map,
        date: date,
        contact: contact,
        picture: picture,
        detail: detail
      }
      this.count = this.count + 1
      Events.push(eventNow)
      console.log(this.events.detail)
    },
    removeEvent (id) {
      this.showConfirm = true
      firebase.database().ref('events/' + id).remove()
      if (this.eventNow.id === id) {
        this.eventNow.name = ''
        this.eventNow.location = ''
        this.eventNow.map = ''
        this.eventNow.date = ''
        this.eventNow.contact = ''
        this.eventNow.detail = ''
        this.eventNow.picture = ''
      }
    },
    updateEvent (name, location, map, date, contact, picture, detail, id) {
      firebase.database().ref('events/' + id).update({
        name: name,
        location: location,
        map: map,
        date: date,
        contact: contact,
        picture: picture,
        detail: detail
      })
    }
  }
}
</script>

<style>
#app {
  /*background-image: url('./assets/backg.jpg');*/
  /*background-size: cover;*/
  height: 100vh;
  /*background-color: #3d1a52;*/
}
.nav_has-shadow {
  /*border-bottom: 6px solid #ec0186;*/
  width: 100%;
  background-color: #212121;
  height: 7%;
}
.nav-center {
  align-items: baseline;
  padding-top: 10px;
}
.brand {
  font-family: 'Vollkorn', serif;
  padding-top: 10px;
  padding-left: 10px;
}
.nav {
  border-bottom: 2px solid #039be5;
}
.orange {
  font-family: 'Vollkorn', serif;
  color: #ff9800;
  font-size: 25px;
}
.black {
  font-family: 'Vollkorn', serif;
  color: black;
  font-size: 18px;
}
.modal-card-body {
  text-align: left;
}
.sizelogout {
  color: black;
  font-family: 'Vollkorn', serif;
  font-size: 18px;
}
</style>
