<template>
<div id="addevent">
  <div class="left">
    <nav class="panel">
      <p class="panel-head">
        <center>YOYO</center>
      </p>

      <center><input class="search" type="text" placeholder="Find a event" v-model="search">
        <!-- <a class="button is-info">Search</a></center> -->
        <div v-show="!checksearch" v-for="show in filteredItems">
          <span class="panel-icon">
        <i class="fa fa-book"></i>
      </span> {{show.name}}
          <br>
          <a class="button is-warning" @click="gotoEdit(show.id)">Edit</a>
          <a class="button is-danger" @click="removeEvent(show.id)">Delete</a>
          <a class="button is-success" @click="showdetail1(show.id)">Detail</a>
          <a class="button">Like {{countLike(show.id)}}</a>
        </div>
      <hr>
      <a class="panel-block" v-show="checksearch" v-for="n in events">
        <span class="panel-icon">
      <i class="fa fa-book"></i>
    </span> {{n.name}}
        <br><br>
        <a class="button is-warning" @click="gotoEdit(n.id)">Edit</a>
        <a class="button is-danger" @click="removeEvent(n.id)">Delete</a>
        <a class="button is-success" @click="showdetail1(n.id)">Detail</a>
        <a class="button">Like {{countLike(n.id)}}</a>
        <div class="modal is-active" v-show="statusdetail">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <p class="modal-card-title">{{event2.name}}</p>
              <button class="delete" @click="showdetail2()"></button>
            </header>
            <section class="modal-card-body">
              <img :src="event2.picture">
              <br><br>
              <h1>location <br><br> {{event2.location}}</h1>
              <hr>
              <h1>map <br><br> <a target="_blank" :href="event2.map">{{event2.map}}</a>
              <hr>
              <h1>date     <br><br> {{event2.date}}</h1>
              <hr>
              <h1>contact  <br><br> {{event2.contact}}</h1>
              <hr>
              <h1>detial   <br><br> {{event2.detail}}</h1>
              <hr>
              <h1>         <br><br> {{countLike(n.id)}} Like</h1>
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
    <label class="label">link map</label>
    <p class="control has-icon has-icon-right">
      <input class="input" type="text" placeholder="location" v-model="map">
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
    <a class="button is-success" v-show="!statusedit" @click="addTo()">AddEvent</a>
    <a class="button is-success" v-show="statusedit" @click="edit()">Editor</a>
    <a class="button is-success"  @click="cancleEdit()">cancle</a>{{alertnull}}
    <br><br>
  </div>
  <!--BACK TO TOP STARTS-->
<a rel="nofollow" style="display:scroll;position:fixed;bottom:10px;right:5px;" href="#" title="Back to Top"><img src="http://2.bp.blogspot.com/-BkNGUImcIV4/USDcBMHYjqI/AAAAAAAAAig/qEtwRO4pH6Q/s1600/back+to+top.png "/></a><!--mybloggersworld.com-->
<!--BACK TO ENDS-->
</div>
</template>

<script>
export default {
  name: 'addevent',
  components: {},
  props: ['add', 'events', 'count', 'removeEvent', 'changeEdit', 'updateEvent', 'users', 'password'],
  data () {
    return {
      name: '',
      location: '',
      map: '',
      date: '',
      contact: '',
      picture: '',
      detail: '',
      alertnull: '',
      statusedit: false,
      statusdetail: false,
      id: '',
      event2: '',
      search: '',
      statussearch: true
    }
  },
  computed: {
    filteredItems: function () {
      var data = this.events
      // console.log('search :::', this.search)
      console.log(data.filter(item => item.name === this.search))
      return data.filter(item => item.name === this.search)
    },
    checksearch: function () {
      if (this.search !== '') {
        return false
      } else if (this.search === '') {
        return true
      }
    }
  },
  methods: {
    addTo () {
      if (this.name !== '' && this.location !== '' && this.map !== '' && this.date !== '' && this.contact !== '' && this.picture !== '' && this.detail !== '') {
        this.add(this.name, this.location, this.map, this.date, this.contact, this.picture, this.detail)
        this.name = ''
        this.location = ''
        this.map = ''
        this.date = ''
        this.contact = ''
        this.detail = ''
        this.picture = ''
        this.alertnull = ''
      } else {
        this.alertnull = '  Please Check again! Data in fill not null'
      }
    },
    gotoEdit (id) {
      this.statusedit = true
      var event = this.events.find(e => e.id === id)
      this.id = event.id
      this.name = event.name
      this.location = event.location
      this.map = event.map
      this.date = event.date
      this.contact = event.contact
      this.detail = event.detail
      this.picture = event.picture
    },
    edit () {
      if (this.name !== '' && this.location !== '' && this.map !== '' && this.date !== '' && this.contact !== '' && this.picture !== '' && this.detail !== '') {
        this.updateEvent(this.name, this.location, this.map, this.date, this.contact, this.picture, this.detail, this.id)
        this.name = ''
        this.location = ''
        this.map = ''
        this.date = ''
        this.contact = ''
        this.detail = ''
        this.picture = ''
        this.alertnull = ''
      } else {
        this.alertnull = '  Please Check again! Data in fill not null'
      }
    },
    cancleEdit () {
      this.statusedit = false
      this.name = ''
      this.location = ''
      this.map = ''
      this.date = ''
      this.contact = ''
      this.detail = ''
      this.picture = ''
      this.alertnull = ''
    },
    showdetail1 (id) {
      this.statusdetail = true
      var event2 = this.events.find(event2 => event2.id === id)
      this.event2 = event2
      this.statusdetail = true
    },
    showdetail2 () {
      this.statusdetail = false
    },
    countLike (id) {
      var count = 0
      this.users.forEach(user => {
        if (user.eventId === id) {
          count++
        }
      })
      return count
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
