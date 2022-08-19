<template>
  <div id="app">
    <Header subtitle="Log In"/>
    <b-form class = "login" @submit="onSubmit">
      <b-form-group label="User Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" placeholder="Enter password" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="danger">Submit</b-button>
    </b-form>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState([
      'loggedIn'
    ])
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    onSubmit (e) {
      e.preventDefault()
      this.login(this.form)
      localStorage.setItem('loggedUser', this.loggedIn.id)
      console.log('user je ' + this.loggedIn.name)
      this.$router.push({ name: 'Home' })
    }
  }
}
</script>

<style scoped>
  .login{
    padding-top: 55px;
    margin: 0% auto;
    width: 40%;
    height: 300px;
}
</style>
