<template>
<div id="addevent">
  <div class="left">
    <nav class="panel">
      <p class="panel-head">
        <center>All Event</center>
      </p>
      <center><input class="search" type="text" placeholder="Find a event">
        <a class="button is-info">Search</a></center>
        <hr>
      <a class="panel-block" v-for="n in events">
        <span class="panel-icon">
      <i class="fa fa-book"></i>
    </span> {{n.name}}
        <br><br>
        <a class="button is-warning" @click="">Edit</a>
        <a class="button is-danger" @click="">Delete</a>
      </a>
    </nav>
  </div>
  <div class="center">
    <br>
    <label class="label">Event Name</label>
    <p class="control">
      <input class="input" type="text" placeholder="Event Name" v-model="name">
    </p>
    <label class="label">location</label>
    <p class="control has-icon has-icon-right">
      <input class="input" type="text" placeholder="location" v-model="location">
    </p>
    <label class="label">Date & Time</label>
    <p class="control has-icon has-icon-right">
      <input class="input" type="text" placeholder="Date & Time" v-model="date">
    </p>
    <label class="label">contact</label>
    <p class="control has-icon has-icon-right">
      <input class="input" type="text" placeholder="contact" v-model="contact">
    </p>
    <label class="label">link Picture event</label>
    <p class="control">
      <input class="input" type="text" placeholder="link picture" v-model="picture"> </p>
    <label class="label">Details</label>
    <p class="control">
      <textarea class="textarea" placeholder="Details of Event" v-model="detail"></textarea>
    </p>
    <a class="button is-success" @click="addTo()">AddEvent</a> {{alertnull}}
    <br><br>
  </div>
  <div class="right">
  </div>
</div>
</template>

<script>
// import firebase from 'firebase'
// var config = {
//   apiKey: 'AIzaSyBc4O3qrb1xoIZN4jTmWmGvAYWCxvE2x-A',
//   authDomain: 'kmutnbevent.firebaseapp.com',
//   databaseURL: 'https://kmutnbevent.firebaseio.com',
//   storageBucket: 'kmutnbevent.appspot.com',
//   messagingSenderId: '1024101975238'
// }
// firebase.initializeApp(config)
export default {
  name: 'addevent',
  components: {},
  props: ['add', 'events', 'count'],
  data () {
    return {
      name: '',
      location: '',
      date: '',
      contact: '',
      picture: '',
      detail: '',
      alertnull: ''
    }
  },
  methods: {
    addTo () {
      if (this.name !== '' && this.location !== '' && this.date !== '' && this.contact !== '' && this.picture !== '' && this.detail !== '') {
        this.add(this.name, this.location, this.date, this.contact, this.picture, this.detail)
        this.name = ''
        this.location = ''
        this.date = ''
        this.contact = ''
        this.detail = ''
        this.picture = ''
        this.alertnull = ''
      } else {
        this.alertnull = 'Please Check again! Data in fill not null'
      }
    }
  }
}
</script>

<style>
#addevent {
  /*background-image: url('./assets/backg.jpg');*/
  /*background-size: cover;*/
  height: 100vh;
  background-color: #bdbdbd;
}

.left {
  float: left;
  width: 30%;
  padding-top: 20px;
  padding-left: 20px;
}

.center {
  padding-left: 5%;
  float: left;
  width: 60%;
  margin-top: 20px;
  margin-left: 20px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: white;
}

.right {
  width: 15%;
  padding-top: 20px;
}

.panel {
  background-color: white;
  font-size: 20px;
}

.panel-head {
  font-family: 'Yrsa', serif;
  /*background-color: #212121;*/
  font-size: 22px;
  color: black;
}
</style>
