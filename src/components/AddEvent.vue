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
        <a class="button is-warning" @click="gotoEdit()">Edit</a>
        <a class="button is-danger" @click="removeEvent()">Delete</a>
        <a class="button is-success" @click="showdetail1()">Detail</a>
        <div class="modal is-active" v-show="statusdetail">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">details Event</p>
              <button class="delete" @click="showdetail2()"></button>
            </header>
            <section class="modal-card-body">
              {{n.name}}<br><br><br>
              {{n.location}}<br><br>
              {{n.date}}<br><br><br>
              {{n.contact}}<br><br><br>
              {{n.detail}}<br><br><br>
            </section>
          </div>
        </div>
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
    <a class="button is-success" v-show="!statusedit" @click="addTo()">AddEvent</a> {{alertnull}}
    <a class="button is-success" v-show="statusedit" @click="edit()">Editor</a> {{alertnull}}
    <a class="button is-success" v-show="statusedit" @click="cancleEdit()">cancle</a>
    <br><br>
  </div>
</div>
</template>

<script>
export default {
  name: 'addevent',
  components: {},
  props: ['add', 'events', 'count', 'removeEvent', 'id'],
  data () {
    return {
      name: '',
      location: '',
      date: '',
      contact: '',
      picture: '',
      detail: '',
      alertnull: '',
      statusedit: false,
      statusdetail: false
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
    },
    gotoEdit () {
      this.statusedit = true
    },
    cancleEdit () {
      this.statusedit = false
    },
    showdetail1 () {
      this.statusdetail = true
    },
    showdetail2 () {
      this.statusdetail = false
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
  width: 40%;
  padding-top: 20px;
  margin-left: 3%;
}

.center {
  float: left;
  width: 50%;
  margin-top: 20px;
  margin-left: 4%;
  padding-right: 20px;
  padding-left: 20px;
  background-color: white;
}

.panel {
  background-color: white;
  font-size: 18px;
}

.panel-head {
  font-family: 'Yrsa', serif;
  /*background-color: #212121;*/
  font-size: 22px;
  color: black;
}
</style>
