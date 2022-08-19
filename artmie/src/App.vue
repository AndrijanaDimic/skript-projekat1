<template>
  <div class="app">
    <div>
      <b-nav  class = "loginMenu">
        <b-nav-item to = "/shop/1" class= "home">Home</b-nav-item>
        <b-nav-item to = "/login">Login</b-nav-item>
        <b-nav-item  to="/register">Register</b-nav-item>
      </b-nav>
    </div>
  <div>
          <b-navbar  toggleable="sm" class = "navi" type="light" variant="light">
            <b-navbar-brand  href="#">Artmie</b-navbar-brand>
               <img width= 200 src="https://www.artmie.fr/fotky7877/design_setup/images/custom_image_logo.jpg" class="d-inline-block align-top" alt="Kitten">

            <b-navbar-toggle  target="nav-collapse" ></b-navbar-toggle>

            <b-collapse  id="nav-collapse" is-nav>
              <b-navbar-nav class = "ms-auto" center>
                <b-nav-item  href="#">Akcije%</b-nav-item>
                <b-nav-item href="#">O nama</b-nav-item>
                <b-nav-item href="#">Dostava i placanje</b-nav-item>
                <b-nav-item href="#">Kontakt</b-nav-item>
                <router-link  :to="'/store' ">Store</router-link>
              </b-navbar-nav>

              <!-- Right aligned nav items -->
              <b-navbar-nav class="ms-auto" right>
                  <p id = "name" >{{loggedIn.name}}</p>
                <!-- <b-nav-form id = "searchForm">
                  <b-form-input size="sm" v-model = "searchQuery" class="me-sm-2" placeholder="Search" right></b-form-input>
                </b-nav-form> -->
                <!-- <b-button  id = "searchButton" size="sm"  variant="outline-primary" @click ="search" class="my-2 my-sm-0" type="submit">Search</b-button> -->
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </div>
          <!-- <div>
            <img width= 200 src="https://www.artmie.fr/fotky7877/design_setup/images/custom_image_logo.jpg" class="d-inline-block align-top" alt="Kitten">
          </div> -->
        <!-- <Home /> -->
        <router-view/>
    <!-- <GlavnaStrana/> -->
  </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from 'vuex'
// import GlavnaStrana from './views/GlavnaStrana.vue'
// import Home from './views/Home'
export default {
  // components: { Home },
  name: 'App',
  data () {
    return {
      searchQuery: ''
    }
  },
  computed: {
    ...mapState([
      'slikarskiPribor',
      'token',
      'loggedIn'
    ])
  },
  mounted () {
    this.fetchSlikarskiPribor()
    // this.$router.push({ name: 'GlavnaStrana', params: { id: 1 } })
    if (localStorage.token) {
      // this.setToken(localStorage.token)
    }
  },
  methods: {
    ...mapActions([
      'fetchSlikarskiPribor'
    ]),
    search (e) {
      e.preventDefault()
      const sq = this.searchQuery
      this.searchQuery = ''

      this.$router.push({ name: 'Search', query: { q: sq } })
    }
  },
  ...mapMutations([
    'removeToken',
    'setToken'
  ]),
  sockets: {
    error (err) {
      alert(err)
    }
  }
}

</script>

<style>
body {
  /* background-image: url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg?w=2000"); */
 /* https://img.freepik.com/free-vector/white-abstract-wallpaper_23-2148830027.jpg?w=2000 */
}
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
    /* background-color:aliceblue; */
    /* width: 100%;
    height: 100%; */
  /* color: #2c3e50; */
}
.loginMenu {
  background-color: grey;
  height: 35px;
}
.navi {
  background-color: chocolate;
}
#nav {
  padding: 30px;
}
.n {
  background-color: black;
}
#nav a {
  font-weight: bold;
  /* color: #2c3e50; */
}
.home {
  height: 5px;
}
.bar {
  background-color: khaki;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
#searchForm {
  padding-right: 10px;
}
#searchButton {
  padding-right: 20px;
}
E#name {
  float: right;
  background: #42b983;
}

</style>
