<template>
  <div id="container">
    <b-form class = "registration" @submit="onSubmit">
      <b-form-group label="Email address:" label-for="email">
        <b-form-input id="email" v-model="form.email" type="email" placeholder="Enter email" required></b-form-input>
      </b-form-group>
      <b-form-group label="User Name:" label-for="name">
        <b-form-input id="name" v-model="form.name" placeholder="Enter name" required></b-form-input>
      </b-form-group>
      <b-form-group label="Password:" label-for="password">
        <b-form-input id="password" v-model="form.password" type="password" placeholder="Enter password" required></b-form-input>
      </b-form-group>
      <b-form-checkbox id="admin" v-model="form.admin" :value="true" :unchecked-value="false">Admin</b-form-checkbox>
      <br>
      <b-button type="submit" variant="danger">Submit</b-button>
    </b-form>
  </div>
</template>

<script>

import { mapActions } from 'vuex'
export default {
  name: 'Register',
  data () {
    return {
      form: {
        email: '',
        name: '',
        password: '',
        admin: false
      }
    }
  },
  methods: {
    ...mapActions([
      'register'
    ]),
    onSubmit (e) {
      e.preventDefault()
      console.log(this.form)
      this.register(this.form)
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style scoped>
    .container{
      position: relative;
      float: right;
    }
    .registration{
        padding-top: 55px;
        margin: 0% auto;
        width: 40%;
        height: 300px;
    }
</style>
