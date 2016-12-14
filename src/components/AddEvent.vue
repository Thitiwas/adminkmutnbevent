<template>
<div id="addevent">
  <div class="left">
    <nav class="panel">
      <p class="panel-heading">
        <center class="headlist">All Event</center>
      </p>
      <a class="panel-block" v-for="n in events">
        <span class="panel-icon">
      <i class="fa fa-book"></i>
    </span> {{n.name}}
    <button type="button">edit</button>
    <button type="button">x</button>
      </a>
    </nav>
  </div>
<div class="center">
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
  <label class="label">Details</label>
  <p class="control">
    <textarea class="textarea" placeholder="Details of Event" v-model="detail"></textarea>
  </p>
  <a class="button is-success" @click="addTo(name, location, date, contact)">AddEvent</a>
  {{alertnull}}
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
      detail: '',
      alertnull: ''
    }
  },
  methods: {
    addTo () {
      if (this.name !== '' && this.location !== '' && this.date !== '' && this.contact !== '' && this.detail !== '') {
        this.add(this.name, this.location, this.date, this.contact, this.detail)
        this.name = ''
        this.location = ''
        this.date = ''
        this.contact = ''
        this.detail = ''
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
  background-color: #eeeeee;
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
    padding-top: 20px;
}

.right {
  width: 15%;
  padding-top: 20px;
}
.panel-block {
  font-size: 20px;
  background-color: #d1c4e9 ;
}
.headlist {
  background-color: #7c4dff;
}
</style>
